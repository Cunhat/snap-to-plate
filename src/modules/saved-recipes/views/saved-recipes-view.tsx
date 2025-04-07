import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CookingPot, Search } from "lucide-react";
import SavedRecipesHeader from "../sections/saved-recipes-header";

// Mock data for saved recipes
const savedRecipes = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    image: "/placeholder.svg?height=400&width=600",
    source: "YouTube",
    duration: "25 min",
    category: "Pasta",
    saved: "2 days ago",
  },
  {
    id: "2",
    title: "15-Minute Healthy Breakfast Bowl",
    image: "/placeholder.svg?height=400&width=600",
    source: "Instagram",
    duration: "15 min",
    category: "Breakfast",
    saved: "1 week ago",
  },
  {
    id: "3",
    title: "Easy Homemade Pizza Dough",
    image: "/placeholder.svg?height=400&width=600",
    source: "TikTok",
    duration: "40 min",
    category: "Baking",
    saved: "2 weeks ago",
  },
];

// Mock data for categories
const categories = [
  { name: "All", count: 12 },
  { name: "Breakfast", count: 3 },
  { name: "Lunch", count: 2 },
  { name: "Dinner", count: 4 },
  { name: "Desserts", count: 2 },
  { name: "Snacks", count: 1 },
];

export default function SavedRecipesView() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <SavedRecipesHeader />
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <div className="space-y-4">
            <h2 className="font-medium">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.name === "All" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {category.name}
                  <Badge variant="outline" className="ml-auto">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* {savedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))} */}
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* {savedRecipes.slice(0, 2).map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))} */}
                </div>
              </TabsContent>
              <TabsContent value="favorites" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* {savedRecipes.slice(0, 1).map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))} */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
