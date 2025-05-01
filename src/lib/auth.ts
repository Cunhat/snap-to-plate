import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    nextCookies(),
    customSession(async ({ user: authUser, session }) => {
      const currentUser = await db.query.user.findFirst({
        where: eq(user.id, authUser.id),
      });

      const dailyTokens = currentUser?.dailyTokens ?? 0;
      const dailyTokensResetAt = currentUser?.dailyTokensResetAt;

      return {
        user: {
          ...authUser,
          dailyTokens: dailyTokens,
          dailyTokensResetAt: dailyTokensResetAt,
        },
        session,
      };
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
