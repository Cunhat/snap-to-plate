"use client";
import React, { Suspense } from "react";
import RecentRecipes from "../components/recent-recipes";
import { api } from "@/trpc/react";

/**
 * Displays a section of recently generated recipes with a loading fallback using React Suspense.
 *
 * Shows a loading indicator while the latest recipes are being fetched and rendered.
 */
export function RecentRecipesSection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecentRecipesSectionSuspense />
    </Suspense>
  );
}

/**
 * Displays a section showcasing the three most recently generated recipes.
 *
 * Fetches the latest three recipes using a suspense-enabled query and renders them within a styled section.
 */
function RecentRecipesSectionSuspense() {
  const [data] = api.recipe.getLatestRecipes.useSuspenseQuery({
    limit: 3,
  });

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
        <RecentRecipes recipes={data.items} />
      </div>
    </section>
  );
}
