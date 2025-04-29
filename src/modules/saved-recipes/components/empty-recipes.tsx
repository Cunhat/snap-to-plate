import { CookingPot } from "lucide-react";

export function EmptyRecipes() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <CookingPot className="text-muted-foreground h-20 w-20 opacity-50" />
      <p className="text-muted-foreground opacity-50">No recipes found...</p>
    </div>
  );
}
