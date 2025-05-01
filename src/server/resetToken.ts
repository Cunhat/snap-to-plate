"use server";

import type { User } from "better-auth";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { user } from "./db/schema";

interface ExtendedUser extends User {
  dailyTokensResetAt: Date;
  dailyTokens: number;
}

export async function resetToken(userInfo: ExtendedUser) {
  // Check if should reset user's token
  const shouldResetUserToken = dayjs().isAfter(
    dayjs(userInfo.dailyTokensResetAt).add(1, "day").startOf("day"),
  );

  if (shouldResetUserToken) {
    await db
      .update(user)
      .set({ dailyTokens: 0, dailyTokensResetAt: dayjs().toDate() })
      .where(eq(user.id, userInfo.id));
  }
}
