import RecipeView from "@/modules/recipe/views/recipe-view";
import { api, HydrateClient } from "@/trpc/server";

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
