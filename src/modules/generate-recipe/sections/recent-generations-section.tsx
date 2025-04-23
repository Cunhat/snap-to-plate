"use client";
import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

const Loading = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array(6)
      .fill(0)
      .map((_, i) => (
        <Card key={i} className="h-full overflow-hidden py-0">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="ml-auto h-4 w-16" />
            </div>
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-4 w-32" />
          </CardFooter>
        </Card>
      ))}
  </div>
);

export function RecentGenerationsSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
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
      {isLoading && <Loading />}
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
