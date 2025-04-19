import RecipeView from "@/modules/recipe/views/recipe-view";
import { api, HydrateClient } from "@/trpc/server";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SnapToPlate Recipe",
  description: "View a recipe from a cooking video",
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  void api.recipe.getRecipe.prefetch({ id });

  return (
    <HydrateClient>
      <RecipeView id={id} />
    </HydrateClient>
  );
}
