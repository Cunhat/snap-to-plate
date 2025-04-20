"use client";
import RecipeCard from "@/components/recipe-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import Link from "next/link";
import { Suspense } from "react";
// Mock data for categories
const categories = [
  { name: "All", count: 12 },
  { name: "Breakfast", count: 3 },
  { name: "Lunch", count: 2 },
  { name: "Dinner", count: 4 },
  { name: "Desserts", count: 2 },
  { name: "Snacks", count: 1 },
];

export function SavedRecipesList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SavedRecipesListSuspense />
    </Suspense>
  );
}

function SavedRecipesListSuspense() {
  const [recipes] = api.recipe.getUserRecipes.useSuspenseQuery();
  const [data] = api.category.getUserCategories.useSuspenseQuery();
  console.log(data);

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div className="space-y-4">
        <h2 className="font-medium">Categories</h2>
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.name === "All" ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={`/savedRecipes?category=${category.name}`}>
                {category.name}
                <Badge variant="outline" className="ml-auto">
                  {category.count}
                </Badge>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
