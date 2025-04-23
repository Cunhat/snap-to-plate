import UrlInput from "@/components/url-input-section";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          What would you like to cook today?
        </h1>
        <p className="text-muted-foreground">
          Paste a cooking video URL to generate a detailed recipe with
          ingredients and instructions
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg border p-6 shadow-sm">
        <UrlInput />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Free plan: <span className="font-medium">1</span> generation per day
        </p>
        <Link href="/pricing" className="text-primary text-sm hover:underline">
          Upgrade for unlimited generations
        </Link>
      </div>
    </div>
  );
}
