import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <Skeleton className="mb-2 h-10 w-3/4" />
              <Skeleton className="mb-1 h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />

              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg">
              <Skeleton className="h-full w-full" />
            </div>

            <div className="flex flex-wrap gap-6 border-y py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="mb-1 h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>

            <Tabs defaultValue="instructions">
              <TabsList className="bg-muted grid w-full grid-cols-2">
                <TabsTrigger value="instructions" disabled>
                  Instructions
                </TabsTrigger>
                <TabsTrigger value="ingredients" disabled>
                  Ingredients
                </TabsTrigger>
              </TabsList>
              <TabsContent value="instructions" className="mt-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Skeleton className="mt-1 h-6 w-6 flex-shrink-0 rounded-full" />
                    <div className="w-full space-y-1">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-11/12" />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Card className="border-accent/30">
              <CardContent className="p-4">
                <Skeleton className="mb-3 h-6 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex justify-between border-b py-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Skeleton className="mb-3 h-6 w-32" />
                <div className="flex items-center justify-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Skeleton className="mb-3 h-6 w-32" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-16 w-16 rounded-md" />
                      <div>
                        <Skeleton className="mb-1 h-5 w-40" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
