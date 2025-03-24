import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Utensils, Plus, Search } from "lucide-react";

// Mock data for categories
const categories = [
  {
    name: "Breakfast",
    description: "Start your day right with these breakfast recipes",
    image: "/placeholder.svg?height=400&width=600",
    count: 8,
  },
  {
    name: "Lunch",
    description: "Quick and easy lunch ideas for busy days",
    image: "/placeholder.svg?height=400&width=600",
    count: 12,
  },
  {
    name: "Dinner",
    description: "Delicious dinner recipes for the whole family",
    image: "/placeholder.svg?height=400&width=600",
    count: 15,
  },
  {
    name: "Desserts",
    description: "Sweet treats to satisfy your cravings",
    image: "/placeholder.svg?height=400&width=600",
    count: 10,
  },
  {
    name: "Snacks",
    description: "Tasty snacks for any time of day",
    image: "/placeholder.svg?height=400&width=600",
    count: 6,
  },
  {
    name: "Vegetarian",
    description: "Meat-free recipes packed with flavor",
    image: "/placeholder.svg?height=400&width=600",
    count: 9,
  },
  {
    name: "Quick Meals",
    description: "Ready in 30 minutes or less",
    image: "/placeholder.svg?height=400&width=600",
    count: 14,
  },
  {
    name: "Baking",
    description: "Breads, pastries, and other baked goods",
    image: "/placeholder.svg?height=400&width=600",
    count: 7,
  },
];

export default function Categories() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Recipe Categories
            </h1>
            <p className="text-muted-foreground mt-1">
              Browse recipes by category
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="w-full pl-8 sm:w-[250px]"
              />
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Category
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase()}`}
            >
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-video">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute right-3 bottom-3 left-3">
                    <h3 className="text-xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <span className="text-sm font-medium">
                    {category.count} recipes
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    View All
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
