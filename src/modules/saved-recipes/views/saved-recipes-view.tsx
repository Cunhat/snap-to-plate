import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CookingPot, Search } from "lucide-react";
import SavedRecipesHeader from "../sections/saved-recipes-header";
import { SavedRecipesList } from "../sections/saved-recipes-list";

// Mock data for saved recipes
// const savedRecipes = [
//   {
//     id: "1",
//     title: "Creamy Garlic Parmesan Pasta",
//     image: "/placeholder.svg?height=400&width=600",
//     source: "YouTube",
//     duration: "25 min",
//     category: "Pasta",
//     saved: "2 days ago",
//   },
//   {
//     id: "2",
//     title: "15-Minute Healthy Breakfast Bowl",
//     image: "/placeholder.svg?height=400&width=600",
//     source: "Instagram",
//     duration: "15 min",
//     category: "Breakfast",
//     saved: "1 week ago",
//   },
//   {
//     id: "3",
//     title: "Easy Homemade Pizza Dough",
//     image: "/placeholder.svg?height=400&width=600",
//     source: "TikTok",
//     duration: "40 min",
//     category: "Baking",
//     saved: "2 weeks ago",
//   },
// ];

export default function SavedRecipesView() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <SavedRecipesHeader />
        <SavedRecipesList />
      </div>
    </main>
  );
}
