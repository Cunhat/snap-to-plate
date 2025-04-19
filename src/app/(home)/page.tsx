import HomeView from "@/modules/home/ui/views/hove-view";
import { api, HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

/**
 * Prefetches the latest three recipes and renders the home page view within a hydrated client context.
 */
export default async function Home() {
  void api.recipe.getLatestRecipes.prefetch({ limit: 3 });

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
