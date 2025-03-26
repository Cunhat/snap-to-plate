import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Utensils,
  Users,
  BookmarkPlus,
  Share2,
  Printer,
  Youtube,
} from "lucide-react";

// This would normally come from a database or API

const recipeData = {
  id: "demo-recipe",
  title: "Creamy Garlic Parmesan Pasta",
  description:
    "A rich and creamy pasta dish that's perfect for a quick weeknight dinner. This recipe uses simple ingredients but delivers amazing flavor.",
  image: "/placeholder.svg?height=600&width=1200",
  source: {
    platform: "YouTube",
    url: "https://youtube.com/watch?v=example",
    channel: "Cooking with Chef John",
  },
  prepTime: "10 min",
  cookTime: "15 min",
  totalTime: "25 min",
  servings: 4,
  difficulty: "Easy",
  ingredients: [
    "8 oz fettuccine pasta",
    "2 tablespoons butter",
    "4 cloves garlic, minced",
    "1 cup heavy cream",
    "1 cup grated Parmesan cheese",
    "1/2 teaspoon salt",
    "1/4 teaspoon black pepper",
    "2 tablespoons fresh parsley, chopped",
    "Red pepper flakes (optional)",
  ],
  instructions: [
    "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions until al dente. Reserve 1/2 cup of pasta water before draining.",
    "While pasta is cooking, melt butter in a large skillet over medium heat. Add minced garlic and sauté for 1-2 minutes until fragrant but not browned.",
    "Reduce heat to medium-low and add heavy cream. Bring to a gentle simmer and cook for 3-4 minutes until it starts to thicken slightly.",
    "Gradually whisk in the Parmesan cheese until melted and smooth. If sauce is too thick, add some of the reserved pasta water.",
    "Season with salt and pepper to taste.",
    "Add the drained pasta to the sauce and toss to coat evenly. If needed, add more pasta water to reach desired consistency.",
    "Garnish with chopped parsley and red pepper flakes if desired. Serve immediately.",
  ],
  nutrition: {
    calories: 520,
    protein: "18g",
    carbs: "42g",
    fat: "32g",
    fiber: "2g",
    sugar: "3g",
  },
  tags: ["Pasta", "Italian", "Quick Meals", "Vegetarian"],
};

export default function RecipePage() {
  // In a real app, we would fetch the recipe data based on the ID
  const recipe = recipeData;

  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <Link
            href="/"
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
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={recipe.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
                >
                  <Youtube className="mr-1 h-4 w-4 text-red-500" />
                  {recipe.source.channel}
                </Link>
              </div>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-6 border-y py-4">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Total Time</p>
                  <p className="text-muted-foreground text-sm">
                    {recipe.totalTime}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground h-5 w-5"
                >
                  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M12 2v2" />
                  <path d="M12 22v-2" />
                  <path d="m17 20.66-1-1.73" />
                  <path d="M11 10.27 7 3.34" />
                  <path d="m20.66 17-1.73-1" />
                  <path d="m3.34 7 1.73 1" />
                  <path d="M14 12h8" />
                  <path d="M2 12h2" />
                  <path d="m20.66 7-1.73 1" />
                  <path d="m3.34 17 1.73-1" />
                  <path d="m17 3.34-1 1.73" />
                  <path d="m7 20.66 1-1.73" />
                </svg>
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
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="pl-2">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-4">
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
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
              <Button className="w-full gap-2">
                <BookmarkPlus className="h-4 w-4" />
                Save Recipe
              </Button>
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
                      {recipe.nutrition.calories}
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Protein</span>
                    <span className="font-medium">
                      {recipe.nutrition.protein}
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Carbs</span>
                    <span className="font-medium">
                      {recipe.nutrition.carbs}
                    </span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Fat</span>
                    <span className="font-medium">{recipe.nutrition.fat}</span>
                  </div>
                  <div className="flex justify-between border-b py-1">
                    <span>Fiber</span>
                    <span className="font-medium">
                      {recipe.nutrition.fiber}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sugar</span>
                    <span className="font-medium">
                      {recipe.nutrition.sugar}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="mb-3 font-semibold">Adjust Servings</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14" />
                    </svg>
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <span className="mx-4 text-lg font-medium">
                    {recipe.servings}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
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
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
