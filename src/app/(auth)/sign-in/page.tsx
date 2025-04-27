import { auth } from "@/lib/auth";
import SignInView from "@/modules/auth/views/sign-in-view";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In - SnapToPlate",
  description: "Sign in to your SnapToPlate account",
};

export default async function Page() {
  return <SignInView />;
}
