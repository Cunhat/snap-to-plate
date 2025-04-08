import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CookingPot, Search } from "lucide-react";
import Link from "next/link";

export default function SavedRecipesHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Recipes</h1>
        <p className="text-muted-foreground mt-1">
          Manage your favorite recipes
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search saved recipes..."
            className="w-full pl-8 sm:w-[250px]"
          />
        </div>
        <Link
          href="/generateRecipe"
          className={buttonVariants({ variant: "outline" })}
        >
          <CookingPot className="h-4 w-4" />
          New Recipe
        </Link>
      </div>
    </div>
  );
}
