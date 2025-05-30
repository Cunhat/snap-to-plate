import {
  categories,
  recipeCategories,
  recipes,
  userRecipes,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getUserCategories: protectedProcedure.query(async ({ ctx }) => {
    const userSavedRecipes = await ctx.db.query.userRecipes.findMany({
      where: eq(userRecipes.userId, ctx.session?.user.id ?? ""),
      with: {
        recipe: {
          with: {
            categories: {
              with: {
                category: true,
              },
            },
          },
        },
      },
    });

    const categories = userSavedRecipes.map((userRecipe) =>
      userRecipe.recipe.categories.map((category) => category.category),
    );

    const uniqueCategories = new Map<string, { id: number; name: string }>();

    categories.forEach((category) => {
      category.forEach((c) => {
        uniqueCategories.set(c.name, { id: c.id, name: c.name });
      });
    });

    return Array.from(uniqueCategories.values());
  }),
});
