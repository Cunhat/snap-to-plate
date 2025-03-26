import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart } from "lucide-react";
import RecipeCard from "@/components/recipe-card";

// Mock data for recent recipes
const recentRecipes = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    image: "/placeholder.svg?height=400&width=600",
    source: "YouTube",
    duration: "25 min",
    category: "Pasta",
    likes: 342,
  },
  {
    id: "2",
    title: "15-Minute Healthy Breakfast Bowl",
    image: "/placeholder.svg?height=400&width=600",
    source: "Instagram",
    duration: "15 min",
    category: "Breakfast",
    likes: 189,
  },
  {
    id: "3",
    title: "Easy Homemade Pizza Dough",
    image: "/placeholder.svg?height=400&width=600",
    source: "TikTok",
    duration: "40 min",
    category: "Baking",
    likes: 276,
  },
];

export default function RecentRecipes() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recentRecipes.map((recipe) => (
        // <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
        //   <Card className="border-accent/20 hover:border-accent/40 h-full overflow-hidden transition-all hover:shadow-md">
        //     <div className="relative aspect-video">
        //       <img
        //         src={recipe.image || "/placeholder.svg"}
        //         alt={recipe.title}
        //         className="h-full w-full object-cover"
        //       />
        //       <Badge className="bg-primary text-primary-foreground absolute top-2 right-2">
        //         {recipe.source}
        //       </Badge>
        //     </div>
        //     <CardContent className="p-4">
        //       <h3 className="text-accent-foreground line-clamp-2 text-lg font-semibold">
        //         {recipe.title}
        //       </h3>
        //       <div className="mt-2 flex items-center gap-2">
        //         <Badge
        //           variant="outline"
        //           className="border-secondary/30 text-secondary-foreground bg-secondary/10"
        //         >
        //           {recipe.category}
        //         </Badge>
        //         <div className="text-muted-foreground flex items-center text-sm">
        //           <Clock className="mr-1 h-3.5 w-3.5" />
        //           {recipe.duration}
        //         </div>
        //       </div>
        //     </CardContent>
        //     <CardFooter className="flex items-center justify-between p-4 pt-0">
        //       <div className="text-muted-foreground text-sm">
        //         Generated 2 days ago
        //       </div>
        //       <div className="flex items-center text-sm">
        //         <Heart className="text-destructive mr-1 h-3.5 w-3.5" />
        //         {recipe.likes}
        //       </div>
        //     </CardFooter>
        //   </Card>
        // </Link>
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}
