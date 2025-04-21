import { env } from "@/env";
import { prompt } from "@/lib/utils";
import {
  categories,
  nutrition,
  recipeCategories,
  recipes,
  source,
  user,
  userRecipes,
} from "@/server/db/schema";
import { GoogleGenAI } from "@google/genai";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, lt } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  generateRecipeProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import type { AIRecipe } from "@/lib/schemas";

export const recipeRouter = createTRPCRouter({
  getRecipe: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const recipe = await ctx.db.query.recipes.findFirst({
        where: eq(recipes.id, Number(input.id)),
        with: {
          source: true,
          nutrition: true,
          savedByUsers: {
            with: {
              user: true,
            },
          },
          categories: {
            with: {
              category: true,
            },
          },
        },
      });
      return recipe;
    }),

  // A cursor is a pointer to a specific record in the database that we use to efficiently fetch the next set of records. In our case, we're using the recipe's id as the cursor.
  // Here's how it works:
  // Initial Load (First Page):
  // When the page first loads, we don't have a cursor
  // We fetch the first 6 recipes (ordered by creation date, newest first)
  // The API returns these recipes and the nextCursor (which is the ID of the last recipe)
  // Loading More (Next Pages):
  // When you click "View More", we send the last cursor we received
  // The API uses this cursor to find recipes with IDs less than the cursor value
  // This ensures we get the next set of recipes without missing any or getting duplicates
  getLatestRecipes: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().min(1).max(20).default(3),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;

      const items = await ctx.db.query.recipes.findMany({
        orderBy: desc(recipes.createdAt),
        limit: limit + 1,
        where: cursor ? and(lt(recipes.id, cursor)) : undefined,
        with: {
          source: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  createRecipe: generateRecipeProcedure
    .input(
      z.object({
        videoUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const checkIfSourceExists = await ctx.db.query.source.findFirst({
        where: eq(source.url, input.videoUrl),
      });

      if (checkIfSourceExists) {
        const recipe = await ctx.db.query.recipes.findFirst({
          where: eq(recipes.sourceId, checkIfSourceExists.id),
        });

        return recipe;
      }

      const ai = new GoogleGenAI({ apiKey: env.GOOGLE_GENAI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            text: prompt(input.videoUrl),
          },
          {
            fileData: {
              fileUri: input.videoUrl,
            },
          },
        ],
      });

      if (!response.text) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No response from AI",
        });
      }

      const formattedResponse = response.text
        .replace("```json", "")
        .replace("```", "");

      const recipe = (await JSON.parse(formattedResponse)) as AIRecipe;

      console.log(recipe);

      // Create source
      const createSource = await ctx.db
        .insert(source)
        .values({
          platform: recipe.source.platform,
          url: recipe.source.url,
          channel: recipe.source.channel,
        })
        .returning();

      if (!createSource?.[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create source",
        });
      }

      const createNutrition = await ctx.db
        .insert(nutrition)
        .values({
          calories: Number(recipe.nutrition.calories),
          protein: Number(recipe.nutrition.protein),
          carbs: Number(recipe.nutrition.carbs),
          fat: Number(recipe.nutrition.fat),
          fiber: Number(recipe.nutrition.fiber),
          sugar: Number(recipe.nutrition.sugar),
        })
        .returning();

      if (!createNutrition?.[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create nutrition",
        });
      }

      const createdRecipe = await ctx.db
        .insert(recipes)
        .values({
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          totalTime: Number(recipe.totalTime),
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          sourceId: createSource[0].id,
          nutritionId: createNutrition[0].id,
        })
        .returning();

      if (createdRecipe[0] && recipe.categories?.length) {
        // dedupe whitespace‐normalized tag
        const uniqueCategories = Array.from(
          new Set(recipe.categories.map((c) => c.trim())),
        );

        const catRows = await Promise.all(
          uniqueCategories.map((category) =>
            ctx.db
              .insert(categories)
              .values({ name: category })
              .onConflictDoUpdate({
                target: categories.name,
                set: { name: category },
              })
              .returning()
              .then((rows) => rows[0]),
          ),
        );

        await ctx.db.insert(recipeCategories).values(
          catRows.map((c) => ({
            recipeId: createdRecipe[0]!.id,
            categoryId: c!.id,
          })),
        );
      }

      if (ctx.session) {
        try {
          await ctx.db.insert(userRecipes).values({
            userId: ctx.session.user.id,
            recipeId: createdRecipe[0]!.id,
          });
        } catch (error) {
          console.error("Failed to associate recipe with user:", error);
          // Continue execution as the recipe was still created successfully
        }
      }

      return createdRecipe[0];
    }),
  getUserRecipes: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.query.userRecipes.findMany({
      where: eq(userRecipes.userId, ctx.session?.user.id ?? ""),
      with: {
        recipe: {
          with: {
            source: true,
            categories: {
              with: {
                category: true,
              },
            },
          },
        },
      },
    });
  }),
  saveRecipe: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const checkIfRecipeExists = await ctx.db.query.recipes.findFirst({
        where: eq(recipes.id, input.id),
      });

      if (!checkIfRecipeExists) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Recipe not found",
        });
      }

      const checkIfUserRecipeExists = await ctx.db.query.userRecipes.findFirst({
        where: and(
          eq(userRecipes.userId, ctx.session?.user.id ?? ""),
          eq(userRecipes.recipeId, input.id),
        ),
      });

      if (checkIfUserRecipeExists) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Recipe already saved",
        });
      }

      const saved = await ctx.db
        .insert(userRecipes)
        .values({
          userId: ctx.session?.user.id ?? "",
          recipeId: input.id,
        })
        .returning();

      return saved;
    }),
  removeFromSavedRecipes: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(userRecipes)
        .where(
          and(
            eq(userRecipes.userId, ctx.session?.user.id ?? ""),
            eq(userRecipes.recipeId, input.id),
          ),
        );
    }),
});
