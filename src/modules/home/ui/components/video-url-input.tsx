"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type VideoUrlInputProps = {
  submit: (e: React.FormEvent) => void;
};

export default function VideoUrlInput({ submit }: VideoUrlInputProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    // Validate URL (basic validation)
    const isValidUrl =
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("instagram.com") ||
      url.includes("tiktok.com");

    if (!isValidUrl) {
      alert("Please enter a valid YouTube, Instagram, or TikTok URL");
      return;
    }

    setIsLoading(true);

    // In a real app, we would send the URL to our backend for processing
    // For this demo, we'll simulate a delay and redirect to a recipe page
    submit(e);
  };

  return (
    <Card className="border-accent/30 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Input
              type="url"
              placeholder="Paste YouTube, Instagram, or TikTok URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-background h-12 text-base"
              required
            />
            <Button
              type="submit"
              className="h-12 w-full text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Video...
                </>
              ) : (
                "Generate Recipe"
              )}
            </Button>
          </div>
          <p className="text-muted-foreground text-center text-xs">
            Processing may take up to 1 minute depending on video length
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
