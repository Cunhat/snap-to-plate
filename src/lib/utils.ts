import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prompt = (videoUrl: string) => `
You are an expert recipe extractor. Your task is to analyze the provided video url and extract recipe information into a JSON object that strictly adheres to the following TypeScript schema:

**TypeScript Schema:**

export interface Recipe {
    title:        string; // Title of the recipe
    description:  string; // A concise description of the recipe
    image:        string; // URL of an image representing the recipe
    source:       Source; // Source of the recipe
    prepTime:     number; // Preparation time in seconds
    cookTime:     number; // Cooking time in seconds
    totalTime:    number; // Total time in seconds
    servings:     number; // Number of servings
    difficulty:   string; // Difficulty level (e.g., "Easy", "Medium", "Hard")
    ingredients:  string[]; // List of ingredients
    instructions: string[]; // Step-by-step instructions
    nutrition:    Nutrition; // Nutritional information
    tags:         string[]; // Relevant tags (e.g., "vegetarian", "dessert", "Italian")
}

export interface Nutrition {
    calories: number; // Calories per serving
    protein:  number; // Protein per serving should in grams
    carbs:    number; // Carbohydrates per serving should in grams
    fat:      number; // Fat per serving should in grams
    fiber:    number; // Fiber per serving should in grams
    sugar:    number; // Sugar per serving should in grams
}

export interface Source {
    platform: string; // Platform where the recipe was found (e.g., "YouTube")
    url:      string; // URL of the recipe source
    channel:  string; // Channel or creator name
}


**Input:**

${videoUrl}

**Instructions:**

1.  **Strict Adherence:** Your response MUST be a valid JSON object that strictly conforms to the provided TypeScript schema.
2.  **Complete Extraction:** Extract as much information as possible from the video. If specific data is missing (e.g., nutrition), provide default or estimated values, or indicate "N/A" where appropriate.
3.  **Accurate Interpretation:** Interpret the video accurately to extract the relevant recipe details. Also, give me the exact title and the description of the video.
4.  **Array Formatting:** Ensure that the "ingredients", "instructions", and "tags" fields are correctly formatted as JSON arrays of strings.
5.  **Numerical Values:** Ensure that "servings" and "calories" are numerical values.
6.  **Time Formatting**: Format "prepTime", "cookTime", and "totalTime" as strings.
7.  **Source Information:** Populate the "source" object with the correct platform, URL, and channel name.
8.  **Nutritional Estimates**: if no nutrition information is available, attempt to estimate the values based on ingredients and common cooking techniques. If no estimate is possible, provide "N/A" for all nutritional values.
9. **Difficulty Level**: if difficulty level is not explicitly stated, estimate it based on the complexity of the recipe.
10. **Error Handling**: if is not possible to extract the recipe details, return an error with the case of the error.
11. **Response Format**: This is very important and mandatory, the response must be only the JSON object, nothing else.
12. **Image**: Is really important to get the video thumbnail as the image.
`;
