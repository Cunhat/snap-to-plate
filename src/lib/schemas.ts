import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { recipes } from "@/server/db/schema";

export const recipeInsertSchema = createInsertSchema(recipes);

export interface Recipe {
  id: string; // Unique identifier for the recipe (e.g., video ID)
  title: string; // Title of the recipe
  description: string; // A concise description of the recipe
  image: string; // URL of an image representing the recipe
  source: Source; // Source of the recipe
  prepTime: string; // Preparation time (e.g., "15 minutes")
  cookTime: string; // Cooking time (e.g., "30 minutes")
  totalTime: string; // Total time (prep + cook, e.g., "45 minutes")
  servings: number; // Number of servings
  difficulty: string; // Difficulty level (e.g., "Easy", "Medium", "Hard")
  ingredients: string[]; // List of ingredients
  instructions: string[]; // Step-by-step instructions
  nutrition: Nutrition; // Nutritional information
  tags: string[]; // Relevant tags (e.g., "vegetarian", "dessert", "Italian")
}

export interface Nutrition {
  calories: number; // Calories per serving
  protein: string; // Protein per serving
  carbs: string; // Carbohydrates per serving
  fat: string; // Fat per serving
  fiber: string; // Fiber per serving
  sugar: string; // Sugar per serving
}

export interface Source {
  platform: string; // Platform where the recipe was found (e.g., "YouTube")
  url: string; // URL of the recipe source
  channel: string; // Channel or creator name
}
