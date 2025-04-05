import HomeView from "@/modules/home/ui/views/hove-view";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  void api.recipe.getLatestRecipes.prefetch();

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
