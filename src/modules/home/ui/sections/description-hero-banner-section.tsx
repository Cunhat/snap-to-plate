import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function DescriptionHeroBanner() {
  return (
    <section className="from-accent to-background bg-gradient-to-b py-12 md:py-24">
      <div className="container md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-accent-foreground text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Turn Cooking Videos into Detailed Recipes
              </h1>
              <p className="text-muted-foreground md:text-xl">
                SnapToPlate analyzes cooking videos from YouTube, Instagram, and
                TikTok to create step-by-step recipes with ingredients and
                nutritional information.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 hover:bg-primary/10"
              >
                How It Works
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <img
                alt="Cooking video being transformed into a recipe"
                className="aspect-video w-full object-cover"
                src="/placeholder.svg?height=720&width=1280"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
