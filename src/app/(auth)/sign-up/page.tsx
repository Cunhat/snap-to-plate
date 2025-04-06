import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up - SnapToPlate",
  description: "Create a new SnapToPlate account",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Utensils className="text-primary h-8 w-8" />
          <span className="text-2xl font-bold">SnapToPlate</span>
        </Link>

        <Card className="border-accent/30 w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create a SnapToPlate account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="h-12 w-full gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Sign up with Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="first-name"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    First name
                  </label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="last-name"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Last name
                  </label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    className="h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11"
                  required
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  Password must be at least 8 characters long and include a
                  number and special character
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    privacy policy
                  </Link>
                </label>
              </div>
              <Button type="submit" className="h-11 w-full">
                Create Account
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      <footer className="border-t py-4 md:py-6">
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
