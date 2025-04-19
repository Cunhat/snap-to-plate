"use client";
import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

export function RecentGenerationsSection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecentGenerationsSectionSuspense />
    </Suspense>
  );
}

function RecentGenerationsSectionSuspense() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.recipe.getLatestRecipes.useInfiniteQuery(
      {
        limit: 6,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const recipes = data?.pages.flatMap((page) => page.items) ?? [];

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
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="gap-1"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "View More"}{" "}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
