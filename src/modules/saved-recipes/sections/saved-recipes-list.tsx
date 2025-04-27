"use client";
import RecipeCard from "@/components/recipe-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useQueryState } from "nuqs";
import { CookingPot } from "lucide-react";

export function SavedRecipesList() {
  const [categoryId, setCategoryId] = useQueryState("category");

  const [recipes] = api.recipe.getUserRecipes.useSuspenseQuery();
  const [categories] = api.category.getUserCategories.useSuspenseQuery();

  const filteredRecipes = useMemo(() => {
    if (!categoryId) {
      return recipes;
    }

    return recipes.filter((recipe) => {
      return recipe.recipe.categories.some((category) => {
        const numCategoryId = Number(categoryId);
        return !isNaN(numCategoryId) && category.id === numCategoryId;
      });
    });
  }, [recipes, categoryId]);

  if (filteredRecipes.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <CookingPot className="text-muted-foreground h-20 w-20 opacity-50" />
        <p className="text-muted-foreground opacity-50">No recipes found...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div className="space-y-4">
        <h2 className="font-medium">Categories</h2>
        <div className="space-y-1">
          <Button
            key={"all"}
            variant={!categoryId ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setCategoryId(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                categoryId === category.id.toString() ? "secondary" : "ghost"
              }
              className="w-full justify-start"
              onClick={() => setCategoryId(category.id.toString())}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
