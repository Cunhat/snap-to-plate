import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils, Clock, Home, UserPlus } from "lucide-react";

export default function RateLimitedPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="border-accent/30 w-full max-w-md shadow-lg">
        <CardHeader className="pb-2 text-center">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Clock className="text-primary h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Recipe Generation Limit Reached
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            You've reached the limit of 1 recipe generation per day. Our AI chef
            needs a short break!
          </p>

          <div className="py-4">
            <p className="text-primary text-lg font-medium">
              Create an account to continue
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Sign up for a free account to get higher limits and save your
              favorite recipes.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 text-sm">
            <h3 className="mb-2 font-medium">Premium benefits:</h3>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-left">
              <li>Access to premium recipe generation limits</li>
              <li>Save unlimited recipes to your collection</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full gap-2">
            <Link href="/sign-up">
              <UserPlus className="h-4 w-4" />
              Sign Up Now
            </Link>
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
