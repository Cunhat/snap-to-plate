import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function AreYouReadySection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">
              Ready to Create Your First Recipe?
            </h2>
            <p className="text-muted-foreground">
              It's as easy as pasting a video URL
            </p>
          </div>
          <div className="flex justify-center">
            <Button size="lg" className="gap-1" asChild>
              <Link href="/generateRecipe">
                Get Started <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
