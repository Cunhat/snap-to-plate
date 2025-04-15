import GenerateRecipeView from "@/modules/generate-recipe/views/generate-recipe-view";
import { api, HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function GeneratePage() {
  void api.recipe.getLatestRecipes.prefetch();

  return (
    <HydrateClient>
      <GenerateRecipeView />
    </HydrateClient>
  );
}
