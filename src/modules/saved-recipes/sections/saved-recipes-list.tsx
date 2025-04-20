"use client";
import RecipeCard from "@/components/recipe-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import Link from "next/link";
import { Suspense } from "react";

export function SavedRecipesList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SavedRecipesListSuspense />
    </Suspense>
  );
}

function SavedRecipesListSuspense() {
  const [recipes] = api.recipe.getUserRecipes.useSuspenseQuery();
  const [categories] = api.category.getUserCategories.useSuspenseQuery();

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div className="space-y-4">
        <h2 className="font-medium">Categories</h2>
        <div className="space-y-1">
          <Button
            key={"all"}
            variant={"secondary"}
            className="w-full justify-start"
            asChild
          >
            <Link href={`/savedRecipes`}>All</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={"ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={`/savedRecipes?category=${category}`}>
                {category}
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
