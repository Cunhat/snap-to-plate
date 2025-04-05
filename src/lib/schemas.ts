import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { recipes } from "@/server/db/schema";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

// type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export const recipeInsertSchema = createInsertSchema(recipes);
export const RecipeSelectSchema = createSelectSchema(recipes);

// For specific router output types when needed
export type RecipeType = RouterOutput["recipe"]["getLatestRecipes"][number];
