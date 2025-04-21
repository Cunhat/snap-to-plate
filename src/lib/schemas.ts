import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { recipes, nutrition, source } from "@/server/db/schema";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

// type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export const nutritionInsertSchema = createInsertSchema(nutrition);
export const nutritionSelectSchema = createSelectSchema(nutrition);

export const sourceInsertSchema = createInsertSchema(source);
export const sourceSelectSchema = createSelectSchema(source);

export const recipeInsertSchema = createInsertSchema(recipes);
export const RecipeSelectSchema = createSelectSchema(recipes);

export type Recipe = z.infer<typeof recipeInsertSchema>;
export type Nutrition = z.infer<typeof nutritionInsertSchema>;
export type Source = z.infer<typeof sourceInsertSchema>;

export const AIRecipeSchema = z.object({
  ...recipeInsertSchema.shape,
  source: sourceInsertSchema,
  nutrition: nutritionInsertSchema,
  categories: z.array(z.string()),
});

export type AIRecipe = z.infer<typeof AIRecipeSchema>;

// For AI response that includes nested objects
// export type AIRecipe = Recipe & {
//   source: Source;
//   nutrition: Nutrition;
//   categories: string[];
// };

// For specific router output types when needed
export type RecipeType = RouterOutput["recipe"]["getLatestRecipes"][number];
