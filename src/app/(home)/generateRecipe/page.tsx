import { auth } from "@/lib/auth";
import GenerateRecipeView from "@/modules/generate-recipe/views/generate-recipe-view";
import { api, HydrateClient } from "@/trpc/server";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Generate Recipe",
  description: "Generate a recipe from a cooking video",
};

export default async function GeneratePage() {
  void api.recipe.getLatestRecipes.prefetch({ limit: 6 });

  return (
    <HydrateClient>
      <GenerateRecipeView />
    </HydrateClient>
  );
}
