import GenerateRecipeView from "@/modules/generate-recipe/views/generate-recipe-view";
import { api, HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function GeneratePage() {
  void api.recipe.getLatestRecipes.prefetch({ limit: 6 });

  return (
    <HydrateClient>
      <GenerateRecipeView />
    </HydrateClient>
  );
}
