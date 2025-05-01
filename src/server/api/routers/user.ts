import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  resetDailyTokens: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.db
        .update(user)
        .set({
          dailyTokens: 0,
          dailyTokensResetAt: new Date(),
        })
        .where(eq(user.id, ctx.user.id));

      return { success: true };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to reset daily tokens",
      });
    }
  }),
});
