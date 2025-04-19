import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils, Search, Home, ChefHat } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnapToPlate Not Found",
  description: "The page you are looking for does not exist",
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="text-primary h-6 w-6" />
            <span className="text-xl font-bold">SnapToPlate</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="border-accent/30 w-full max-w-md shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <ChefHat className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              {
                " Oops! It looks like the recipe you're looking for has gone missing from our kitchen."
              }
            </p>

            <div className="py-4">
              <div className="text-primary text-6xl font-bold">404</div>
            </div>

            <div className="bg-muted rounded-lg p-4 text-sm">
              <h3 className="mb-2 font-medium">You might want to:</h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-left">
                <li>Check the URL for typos</li>
                <li>Go back to the home page</li>
                <li>Search for a different recipe</li>
                <li>Browse our recipe categories</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button asChild className="w-full gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="text-primary h-5 w-5" />
            <span className="text-lg font-semibold">SnapToPlate</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 SnapToPlate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
