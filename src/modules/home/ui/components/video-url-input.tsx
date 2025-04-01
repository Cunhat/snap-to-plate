"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";

const VideoUrlInputSchema = z.object({
  url: z.string().url(),
});

export default function VideoUrlInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof VideoUrlInputSchema>>({
    resolver: zodResolver(VideoUrlInputSchema),
    defaultValues: {
      url: "",
    },
  });

  const { mutate, isPending } = api.recipe.createRecipe.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.push(`/recipe/${data?.id}`);
    },
  });

  const handleSubmit = async (
    formData: z.infer<typeof VideoUrlInputSchema>,
  ) => {
    try {
      console.log(formData.url);
      mutate({ videoUrl: formData.url });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="border-accent/30 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Paste YouTube, Instagram, or TikTok URL here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="h-12 w-full text-base"
                disabled={isPending}
              >
                {isPending ? (
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
        </Form>
      </CardContent>
    </Card>
  );
}
