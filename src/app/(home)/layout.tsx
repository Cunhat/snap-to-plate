import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import "@/styles/globals.css";
import { Utensils } from "lucide-react";
import { type Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "SnapToPlate",
  description: "Generate recipes from your favorite videos",
  icons: [
    {
      rel: "icon",
      url: "https://2oooptzs26.ufs.sh/f/4ti4KJ0DJmjepVBIYui3co4XCeMHI2vS6ay9LB8Ukx15u0TR",
      sizes: "32x32",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const signOut = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link
            href={session ? "/savedRecipes" : "/"}
            className="flex items-center gap-2"
          >
            {/* <Utensils className="text-primary h-6 w-6" /> */}
            <Image
              src="https://2oooptzs26.ufs.sh/f/4ti4KJ0DJmjepVBIYui3co4XCeMHI2vS6ay9LB8Ukx15u0TR"
              alt="SnapToPlate"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold">SnapToPlate</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/generateRecipe"
              className="text-sm font-medium hover:underline"
            >
              Generate Recipe
            </Link>
            {session && (
              <>
                <Link
                  href="/savedRecipes"
                  className="text-sm font-medium hover:underline"
                >
                  Saved Recipes
                </Link>
              </>
            )}
            {!session ? (
              <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
                Sign In
              </Link>
            ) : (
              <form action={signOut}>
                <Button type="submit">Sign Out</Button>
              </form>
            )}
          </nav>
        </div>
      </header>
      <main className="flex flex-1">{children}</main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="text-primary h-5 w-5" />
            <span className="text-lg font-semibold">SnapToPlate</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 SnapToPlate. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
