import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { BookmarkPlus, Loader2, Save, Trash2 } from "lucide-react";
import React from "react";

type RecipeActionsProps = {
  isSavedByUser: boolean;
  recipeId: number;
  userId: string;
};

export default function RecipeActions({
  isSavedByUser,
  recipeId,
  userId,
}: RecipeActionsProps) {
  const utils = api.useUtils();
  const { mutate: saveRecipe, isPending } = api.recipe.saveRecipe.useMutation({
    onSuccess: () => {
      utils.recipe.getRecipe.invalidate();
    },
  });

  const { mutate: removeFromSavedRecipes, isPending: isRemoving } =
    api.recipe.removeFromSavedRecipes.useMutation({
      onSuccess: () => {
        utils.recipe.getRecipe.invalidate();
      },
    });

  if (!recipeId || !userId) {
    return null;
  }

  if (isSavedByUser) {
    return (
      <Button
        onClick={() => removeFromSavedRecipes({ id: recipeId })}
        disabled={isRemoving}
        className="w-full gap-2"
      >
        {isRemoving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        {isRemoving ? "Removing..." : "Remove Recipe"}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => saveRecipe({ id: recipeId })}
      disabled={isPending}
      className="w-full gap-2"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <BookmarkPlus className="h-4 w-4" />
      )}
      {isPending ? "Saving..." : "Save Recipe"}
    </Button>
  );
}
