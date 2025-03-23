import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Utensils } from "lucide-react";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex-1">
        <section className="from-accent to-background bg-gradient-to-b py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-accent-foreground text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Turn Cooking Videos into Detailed Recipes
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    SnapToPlate analyzes cooking videos from YouTube, Instagram,
                    and TikTok to create step-by-step recipes with ingredients
                    and nutritional information.
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

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Paste a Video URL to Get Started
                </h2>
                <p className="text-muted-foreground">
                  Works with YouTube, Instagram, and TikTok cooking videos
                </p>
              </div>
              {/* <VideoUrlInput /> */}
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8 space-y-2">
              <h2 className="text-accent-foreground text-2xl font-bold tracking-tighter">
                Recently Generated Recipes
              </h2>
              <p className="text-muted-foreground">
                Check out these recipes recently created by our users
              </p>
            </div>
            {/* <RecentRecipes /> */}
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-accent/20 hover:border-accent/40 p-6 transition-colors">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="bg-accent rounded-full p-3">
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
                      className="text-accent-foreground h-6 w-6"
                    >
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                  </div>
                  <h3 className="text-accent-foreground text-xl font-bold">
                    Paste Any Video URL
                  </h3>
                  <p className="text-muted-foreground">
                    Simply paste the URL of your favorite cooking video from
                    YouTube, Instagram, or TikTok.
                  </p>
                </div>
              </Card>
              <Card className="border-accent/20 hover:border-accent/40 p-6 transition-colors">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="bg-accent rounded-full p-3">
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
                      className="text-accent-foreground h-6 w-6"
                    >
                      <path d="M14 13.5H7" />
                      <path d="M14 9.5H7" />
                      <path d="M22 10.5v2a2.5 2.5 0 0 1-2.5 2.5H16v4.167a2.5 2.5 0 0 1-5 0V15H2.5A2.5 0 0 1 0 12.5v-2A2.5 2.5 0 0 1 2.5 8H11V3.833a2.5 2.5 0 0 1 5 0V8h3.5A2.5 2.5 0 0 1 22 10.5z" />
                    </svg>
                  </div>
                  <h3 className="text-accent-foreground text-xl font-bold">
                    AI Analyzes the Video
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI technology watches the video and extracts
                    ingredients, steps, and nutritional information.
                  </p>
                </div>
              </Card>
              <Card className="border-accent/20 hover:border-accent/40 p-6 transition-colors">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="bg-accent rounded-full p-3">
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
                      className="text-accent-foreground h-6 w-6"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <h3 className="text-accent-foreground text-xl font-bold">
                    Get a Complete Recipe
                  </h3>
                  <p className="text-muted-foreground">
                    Receive a detailed recipe with ingredients, measurements,
                    steps, and macros you can save and share.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
