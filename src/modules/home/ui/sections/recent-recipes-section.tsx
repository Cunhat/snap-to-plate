"use client";
import React, { Suspense } from "react";
import RecentRecipes from "../components/recent-recipes";
import { api } from "@/trpc/react";
import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";

const Loading = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array(3)
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

export function RecentRecipesSection() {
  return (
    <Suspense
      fallback={
        <PageStructure>
          <Loading />
        </PageStructure>
      }
    >
      <RecentRecipesSectionSuspense />
    </Suspense>
  );
}

function RecentRecipesSectionSuspense() {
  const [data] = api.recipe.getLatestRecipes.useSuspenseQuery({
    limit: 3,
  });

  return (
    <PageStructure>
      <RecentRecipes recipes={data.items} />
    </PageStructure>
  );
}

const PageStructure = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-8 space-y-2">
          <h2 className="text-accent-foreground text-2xl font-bold tracking-tighter">
            Recently Generated Recipes
          </h2>
          <p className="text-muted-foreground">
            Check out these recipes recently created by our users
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};
