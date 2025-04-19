import { Card } from "@/components/ui/card";
import { CookingPot, Sparkles, TvMinimalPlay } from "lucide-react";

/**
 * Renders a section outlining the three-step process for generating a recipe from a YouTube cooking video.
 *
 * Displays a responsive grid with cards describing how users can paste a video URL, have AI analyze the video, and receive a complete recipe.
 */
export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-accent/20 hover:border-accent/40 p-6 transition-colors">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="bg-accent rounded-full p-3">
                <TvMinimalPlay className="text-accent-foreground h-6 w-6" />
              </div>
              <h3 className="text-accent-foreground text-xl font-bold">
                Paste Any Video URL
              </h3>
              <p className="text-muted-foreground">
                Simply paste the URL of your favorite cooking video from
                YouTube.
              </p>
            </div>
          </Card>
          <Card className="border-accent/20 hover:border-accent/40 p-6 transition-colors">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="bg-accent rounded-full p-3">
                <Sparkles className="text-accent-foreground h-6 w-6" />
              </div>
              <h3 className="text-accent-foreground text-xl font-bold">
                AI Analyzes the Video
              </h3>
              <p className="text-muted-foreground">
                Our AI technology watches the video and extracts ingredients,
                steps, and nutritional information.
              </p>
            </div>
          </Card>
          <Card className="border-accent/20 hover:border-accent/40 p-6 transition-colors">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="bg-accent rounded-full p-3">
                <CookingPot className="text-accent-foreground h-6 w-6" />
              </div>
              <h3 className="text-accent-foreground text-xl font-bold">
                Get a Complete Recipe
              </h3>
              <p className="text-muted-foreground">
                Receive a detailed recipe with ingredients, measurements, steps,
                and macros you can save and share.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
