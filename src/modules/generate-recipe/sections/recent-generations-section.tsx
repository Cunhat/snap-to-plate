"use client";
import RecipeCard from "@/components/recipe-card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { Suspense } from "react";
import { api } from "@/trpc/react";

export function RecentGenerationsSection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecentGenerationsSectionSuspense />
    </Suspense>
  );
}

function RecentGenerationsSectionSuspense() {
  const [recipes] = api.recipe.getLatestRecipes.useSuspenseQuery();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recently Generated Recipes</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline" className="gap-1">
          View More <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
