import { auth } from "@/lib/auth";
import SavedRecipesView from "@/modules/saved-recipes/views/saved-recipes-view";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SavedRecipes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  void api.recipe.getUserRecipes.prefetch();

  return (
    <HydrateClient>
      <SavedRecipesView />
    </HydrateClient>
  );
}
