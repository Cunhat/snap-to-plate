import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { GoogleGenAI } from "@google/genai";
import { env } from "@/env";
import { prompt } from "@/lib/utils";
import { recipeInsertSchema } from "@/lib/schemas";
import { TRPCError } from "@trpc/server";
import { nutrition, recipes, source } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const recipeRouter = createTRPCRouter({
  getRecipe: publicProcedure.query(async ({ ctx }) => {
    const recipe = await ctx.db.query.recipes.findFirst();
    return recipe;
  }),
  createRecipe: publicProcedure
    .input(
      z.object({
        videoUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const checkIfRecipeExists = await ctx.db.query.recipes.findFirst({
        where: eq(source.url, input.videoUrl),
      });

      if (checkIfRecipeExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Recipe already exists",
        });
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

      console.log(formattedResponse);

      const recipe = await JSON.parse(formattedResponse);

      //   const parsedRecipe = recipeInsertSchema.parse(recipe);

      // Create source
      const createSource = await ctx.db
        .insert(source)
        .values({
          platform: recipe.source.platform,
          url: recipe.source.url,
          channel: recipe.source.channel,
        })
        .returning();

      if (!createSource || !createSource[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create source",
        });
      }

      const createNutrition = await ctx.db
        .insert(nutrition)
        .values({
          calories: recipe.nutrition.calories,
          protein: recipe.nutrition.protein,
          carbs: recipe.nutrition.carbs,
          fat: recipe.nutrition.fat,
          fiber: recipe.nutrition.fiber,
          sugar: recipe.nutrition.sugar,
        })
        .returning();

      if (!createNutrition || !createNutrition[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create nutrition",
        });
      }

      const createdRecipe = await ctx.db.insert(recipes).values({
        ...recipe,
        sourceId: createSource[0].id,
        nutritionId: createNutrition[0].id,
      });

      return response;
    }),
});
