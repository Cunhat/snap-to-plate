"use client";
import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { EmptyRecipes } from "../components/empty-recipes";

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
        return !isNaN(numCategoryId) && category.categoryId === numCategoryId;
      });
    });
  }, [recipes, categoryId]);

  if (filteredRecipes.length === 0 && !categoryId) {
    return <EmptyRecipes />;
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
        {filteredRecipes.length === 0 && <EmptyRecipes />}
      </div>
    </div>
  );
}
