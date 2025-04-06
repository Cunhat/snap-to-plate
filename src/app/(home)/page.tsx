import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/hove-view";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  void api.recipe.getLatestRecipes.prefetch();

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
