"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GeneratingRecipeModal from "@/modules/generate-recipe/components/generating-recipe-modal";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "better-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const VideoUrlInputSchema = z.object({
  url: z.string().url(),
});

type VideoUrlInputProps = {
  user: User | undefined;
};

export default function VideoUrlInput({ user }: VideoUrlInputProps) {
  const [generatingRecipeModalOpen, setGeneratingRecipeModalOpen] =
    useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof VideoUrlInputSchema>>({
    resolver: zodResolver(VideoUrlInputSchema),
    defaultValues: {
      url: "",
    },
  });

  const { mutate, isPending } = api.recipe.createRecipe.useMutation({
    onSuccess: (data) => {
      router.push(`/recipe/${data?.id}`);
    },
    onError: (error) => {
      setGeneratingRecipeModalOpen(false);
      if (error.data?.code === "TOO_MANY_REQUESTS") {
        router.push("/recipeLimit");
      }
    },
  });

  const handleSubmit = async (
    formData: z.infer<typeof VideoUrlInputSchema>,
  ) => {
    try {
      mutate({ videoUrl: formData.url });
      setGeneratingRecipeModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setGeneratingRecipeModalOpen(false);
    }
  };

  return (
    <>
      <GeneratingRecipeModal
        open={generatingRecipeModalOpen}
        onOpenChange={setGeneratingRecipeModalOpen}
        videoUrl={form.getValues("url")}
      />
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
                          placeholder="Paste YouTube video URL here"
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
    </>
  );
}
