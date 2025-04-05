import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Utensils, FolderPlus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/recipe-card";

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

export default function SavedRecipes() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
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
            <Button variant="outline" className="gap-2">
              <FolderPlus className="h-4 w-4" />
              New Category
            </Button>
          </div>
        </div>

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
