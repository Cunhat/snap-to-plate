import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Utensils,
  Users,
  BookmarkPlus,
  Share2,
  Printer,
  Youtube,
} from "lucide-react";
import { env } from "@/env";
import { api, HydrateClient } from "@/trpc/server";
import Recipe from "@/modules/recipe/views/recipe-view";
import RecipeView from "@/modules/recipe/views/recipe-view";

// This would normally come from a database or API

const recipeData = {
  id: "demo-recipe",
  title: "Creamy Garlic Parmesan Pasta",
  description:
    "A rich and creamy pasta dish that's perfect for a quick weeknight dinner. This recipe uses simple ingredients but delivers amazing flavor.",
  image: "/placeholder.svg?height=600&width=1200",
  source: {
    platform: "YouTube",
    url: "https://youtube.com/watch?v=example",
    channel: "Cooking with Chef John",
  },
  prepTime: "10 min",
  cookTime: "15 min",
  totalTime: "25 min",
  servings: 4,
  difficulty: "Easy",
  ingredients: [
    "8 oz fettuccine pasta",
    "2 tablespoons butter",
    "4 cloves garlic, minced",
    "1 cup heavy cream",
    "1 cup grated Parmesan cheese",
    "1/2 teaspoon salt",
    "1/4 teaspoon black pepper",
    "2 tablespoons fresh parsley, chopped",
    "Red pepper flakes (optional)",
  ],
  instructions: [
    "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions until al dente. Reserve 1/2 cup of pasta water before draining.",
    "While pasta is cooking, melt butter in a large skillet over medium heat. Add minced garlic and sauté for 1-2 minutes until fragrant but not browned.",
    "Reduce heat to medium-low and add heavy cream. Bring to a gentle simmer and cook for 3-4 minutes until it starts to thicken slightly.",
    "Gradually whisk in the Parmesan cheese until melted and smooth. If sauce is too thick, add some of the reserved pasta water.",
    "Season with salt and pepper to taste.",
    "Add the drained pasta to the sauce and toss to coat evenly. If needed, add more pasta water to reach desired consistency.",
    "Garnish with chopped parsley and red pepper flakes if desired. Serve immediately.",
  ],
  nutrition: {
    calories: 520,
    protein: "18g",
    carbs: "42g",
    fat: "32g",
    fiber: "2g",
    sugar: "3g",
  },
  tags: ["Pasta", "Italian", "Quick Meals", "Vegetarian"],
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  void api.recipe.getRecipe.prefetch({ id });

  return (
    <HydrateClient>
      <RecipeView id={id} />
    </HydrateClient>
  );
}
