import { auth } from "@/lib/auth";
import SignInView from "@/modules/auth/views/sign-in-view";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In - SnapToPlate",
  description: "Sign in to your SnapToPlate account",
};

export default async function Page() {
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    await auth.api.signInEmail({
      body: {
        email: email as string,
        password: password as string,
      },
    });

    redirect("/savedRecipes");
  };

  return <SignInView />;
}
