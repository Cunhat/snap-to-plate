import HomeView from "@/modules/home/ui/views/hove-view";
import { api, HydrateClient } from "@/trpc/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SnapToPlate",
  description: "Turn cooking videos into detailed recipes",
};

export default async function Home() {
  void api.recipe.getLatestRecipes.prefetch({ limit: 3 });

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
