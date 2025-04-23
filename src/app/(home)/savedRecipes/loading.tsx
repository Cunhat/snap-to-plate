import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export default function SavedRecipesLoading() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="mb-2 h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          {/* Categories sidebar skeleton */}
          <div className="space-y-4">
            <Skeleton className="mb-4 h-6 w-24" />
            <div className="space-y-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="space-y-6">
            {/* Recipe cards skeleton */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="h-full overflow-hidden py-0">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="ml-auto h-4 w-16" />
                      </div>
                      <Skeleton className="mb-2 h-6 w-full" />
                      <Skeleton className="mb-4 h-6 w-3/4" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Skeleton className="h-4 w-32" />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
