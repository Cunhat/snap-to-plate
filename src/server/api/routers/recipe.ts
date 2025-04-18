import { env } from "@/env";
import { prompt } from "@/lib/utils";
import {
  nutrition,
  recipes,
  source,
  user,
  userRecipes,
} from "@/server/db/schema";
import { GoogleGenAI } from "@google/genai";
import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
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
        },
      });
      return recipe;
    }),
  getLatestRecipes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.recipes.findMany({
      orderBy: desc(recipes.createdAt),
      limit: 3,
      with: {
        source: true,
      },
    });
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
          tags: recipe.tags,
          sourceId: createSource[0].id,
          nutritionId: createNutrition[0].id,
        })
        .returning();

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
  getUserRecipes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.userRecipes.findMany({
      where: eq(userRecipes.userId, ctx.session?.user.id ?? ""),
      with: {
        recipe: {
          with: {
            source: true,
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
