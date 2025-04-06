import { publicProcedure } from "../trpc";
import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, firstName, lastName } = input;

      const signUp = await authClient.signUp.email(
        {
          email: email, // user email address
          password: password, // user password -> min 8 characters by default
          name: `${firstName} ${lastName}`, // user display name
        },
        {
          onRequest: (ctx) => {},
          onSuccess: (ctx) => {
            redirect("/savedRecipes");
          },
          onError: (ctx) => {
            throw new TRPCError({
              code: "UNPROCESSABLE_CONTENT",
              message: ctx.error.message,
            });
          },
        },
      );
    }),
});
