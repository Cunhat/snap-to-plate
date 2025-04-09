import type { Metadata } from "next";
import SignUpView from "@/modules/auth/views/sign-up-view";

export const metadata: Metadata = {
  title: "Sign Up - SnapToPlate",
  description: "Create a new SnapToPlate account",
};

export default function Page() {
  return <SignUpView />;
}
