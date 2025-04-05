import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart } from "lucide-react";
import RecipeCard from "@/components/recipe-card";
import type { RecipeType } from "@/lib/schemas";

type RecentRecipesProps = {
  recipes: RecipeType[];
};

export default function RecentRecipes({ recipes }: RecentRecipesProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
