import { auth } from "@/lib/auth";
import SavedRecipesView from "@/modules/saved-recipes/views/saved-recipes-view";
import { api, HydrateClient } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Saved Recipes",
  description: "View your saved recipes",
};

export default async function SavedRecipes({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const categoryId = searchParams.category as string;

  if (!session) {
    redirect("/");
  }

  void api.recipe.getUserRecipes.prefetch();
  void api.category.getUserCategories.prefetch();

  return (
    <HydrateClient>
      <SavedRecipesView categoryId={categoryId} />
    </HydrateClient>
  );
}
