import { auth } from "@/lib/auth";
import SavedRecipesView from "@/modules/saved-recipes/views/saved-recipes-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SavedRecipes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return <SavedRecipesView />;
}
