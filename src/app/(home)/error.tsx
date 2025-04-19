"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils, RefreshCw, Home, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const metadata: Metadata = {
  title: "SnapToPlate Error",
  description: "An error occurred while processing your request",
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="border-accent/30 w-full max-w-md shadow-lg">
        <CardHeader className="pb-2 text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Something Went Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            {
              "We're sorry, but we encountered an unexpected error while processing your request."
            }
          </p>

          {error.digest && (
            <div className="bg-muted text-muted-foreground overflow-auto rounded-md p-3 font-mono text-xs">
              Error ID: {error.digest}
            </div>
          )}

          <div className="bg-muted rounded-lg p-4 text-sm">
            <h3 className="mb-2 font-medium">You can try:</h3>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-left">
              <li>Refreshing the page</li>
              <li>Going back to the home page</li>
              <li>Trying again later</li>
              <li>Clearing your browser cache</li>
            </ul>
          </div>

          <p className="text-muted-foreground text-sm">
            If the problem persists, please contact our support team.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={() => window.location.reload()}
            className="w-full gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" className="w-full gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
