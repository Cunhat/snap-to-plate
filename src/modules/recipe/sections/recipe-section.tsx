"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  ArrowLeft,
  BookmarkPlus,
  Clock,
  Cog,
  Printer,
  Share2,
  Users,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import RecipeActions from "../components/recipe-action";

dayjs.extend(duration);

export function RecipeSection({ id }: { id: string }) {
  const [recipe] = api.recipe.getRecipe.useSuspenseQuery({ id });
  const session = authClient.useSession();

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const isSavedByUser = recipe.savedByUsers.some(
    (savedByUser) => savedByUser.userId === session?.data?.user.id,
  );

  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <Link
            href={session.data?.user.id ? "/savedRecipes" : "/"}
            className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight">
                {recipe.title}
              </h1>
              <p className="text-muted-foreground">{recipe.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.categories?.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.category.name}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={recipe.source?.url ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
                >
                  <Youtube className="mr-1 h-4 w-4 text-red-500" />
                  {recipe.source?.channel}
                </Link>
              </div>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={recipe.image ?? "/placeholder.svg"}
                alt={recipe.title ?? ""}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-6 border-y py-4">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Total Time</p>
                  <p className="text-muted-foreground text-sm">
                    {dayjs
                      .duration(recipe?.totalTime ?? 0, "seconds")
                      .format("HH[h] mm[m]")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Servings</p>
                  <p className="text-muted-foreground text-sm">
                    {recipe.servings}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cog className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Difficulty</p>
                  <p className="text-muted-foreground text-sm">
                    {recipe.difficulty}
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="instructions">
              <TabsList className="bg-muted grid w-full grid-cols-2">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              </TabsList>
              <TabsContent value="instructions" className="mt-4 space-y-4">
                <ol className="list-inside list-decimal space-y-4">
                  {recipe.instructions?.map((step, index) => (
                    <li key={index} className="pl-2">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-4">
                <ul className="space-y-2">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="border-primary bg-primary/10 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <RecipeActions
                isSavedByUser={isSavedByUser}
                userId={session.data?.user.id ?? ""}
                recipeId={recipe.id}
              />
              <Button variant="outline" className="w-full gap-2">
                <Share2 className="h-4 w-4" />
                Share Recipe
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Printer className="h-4 w-4" />
                Print Recipe
              </Button>
            </div>

            <Card className="border-accent/30">
              <CardContent className="p-4">
                <h3 className="text-accent-foreground mb-3 font-semibold">
                  Nutrition Facts
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b py-1">
                    <span>Calories</span>
                    <span className="font-medium">
                      {recipe.nutrition?.calories}
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Protein</span>
                    <span className="font-medium">
                      {recipe.nutrition?.protein} g
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Carbs</span>
                    <span className="font-medium">
                      {recipe.nutrition?.carbs} g
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Fat</span>
                    <span className="font-medium">
                      {recipe.nutrition?.fat} g
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Fiber</span>
                    <span className="font-medium">
                      {recipe.nutrition?.fiber} g
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sugar</span>
                    <span className="font-medium">
                      {recipe.nutrition?.sugar} g
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardContent className="p-4">
                <h3 className="mb-3 font-semibold">Similar Recipes</h3>
                <div className="space-y-3">
                  <Link href="#" className="group flex items-start gap-3">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Creamy Alfredo Pasta"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="group-hover:text-primary font-medium transition-colors">
                        Creamy Alfredo Pasta
                      </h4>
                      <p className="text-muted-foreground text-sm">20 min</p>
                    </div>
                  </Link>
                  <Link href="#" className="group flex items-start gap-3">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Garlic Butter Shrimp Pasta"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="group-hover:text-primary font-medium transition-colors">
                        Garlic Butter Shrimp Pasta
                      </h4>
                      <p className="text-muted-foreground text-sm">30 min</p>
                    </div>
                  </Link>
                  <Link href="#" className="group flex items-start gap-3">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Lemon Herb Pasta"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="group-hover:text-primary font-medium transition-colors">
                        Lemon Herb Pasta
                      </h4>
                      <p className="text-muted-foreground text-sm">25 min</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </main>
  );
}
