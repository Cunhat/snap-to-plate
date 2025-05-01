"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RecipeType } from "@/lib/schemas";
import { Clock, Flame, Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { getRelativeTime } from "@/lib/utils";

dayjs.extend(duration);
interface RecipeCardProps {
  recipe: RecipeType;
  canSave?: boolean;
}

const RecipeCard = ({ recipe, canSave = false }: RecipeCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const getDifficultyColor = () => {
    switch (recipe.difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const getSourceIcon = () => {
    switch (recipe?.source?.platform?.toLowerCase()) {
      case "youtube":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "instagram":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100";
      case "tiktok":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <Card className="recipe-card-hover h-full gap-0 overflow-hidden border-none py-0 shadow-md transition-all">
        <div className="relative">
          <img
            src={recipe.image ?? "/placeholder.svg"}
            alt={recipe.title ?? ""}
            className="h-52 w-full object-cover"
          />
          {canSave && (
            <div className="absolute top-2 right-2">
              <button
                onClick={toggleSave}
                className="text-recipe-primary rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
                aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
              >
                {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </div>
          )}
          {recipe?.source?.platform && (
            <div className="absolute top-2 left-2 flex gap-1">
              <Badge className={getSourceIcon()}>
                {recipe?.source?.platform?.charAt(0)?.toUpperCase() +
                  recipe?.source?.platform?.slice(1)}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              {recipe.source?.channel}
            </span>
            <span className="text-muted-foreground ml-auto text-xs">
              {getRelativeTime(recipe.createdAt)}
            </span>
          </div>
          <h3 className="font-heading mb-2 line-clamp-1 text-lg font-bold">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-recipe-primary" />
              <span>
                {dayjs
                  .duration(recipe?.totalTime ?? 0, "seconds")
                  .format("HH[h] mm[m]")}
              </span>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
