import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `snap-to-plate_${name}`);

export const recipes = createTable("recipes", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  title: varchar({ length: 256 }),
  description: text(),
  image: text(),
  totalTime: integer(),
  servings: integer(),
  difficulty: varchar({ length: 256 }),
  ingredients: text().array(),
  instructions: text().array(),
  nutritionId: integer().references(() => nutrition.id, {
    onDelete: "cascade",
  }),
  sourceId: integer().references(() => source.id, { onDelete: "cascade" }),
  tokens: integer().default(0),
});

export const nutrition = createTable("nutrition", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  calories: integer(),
  protein: integer(),
  carbs: integer(),
  fat: integer(),
  fiber: integer(),
  sugar: integer(),
});

export const source = createTable("source", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  platform: varchar({ length: 256 }),
  url: text(),
  channel: text(),
});

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  nutrition: one(nutrition, {
    fields: [recipes.nutritionId],
    references: [nutrition.id],
  }),
  source: one(source, {
    fields: [recipes.sourceId],
    references: [source.id],
  }),
  savedByUsers: many(userRecipes),
  categories: many(recipeCategories),
}));

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const userRecipes = createTable("user_recipes", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  recipeId: integer("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  recipes: many(userRecipes),
}));

export const userRecipesRelations = relations(userRecipes, ({ one }) => ({
  user: one(user, {
    fields: [userRecipes.userId],
    references: [user.id],
  }),
  recipe: one(recipes, {
    fields: [userRecipes.recipeId],
    references: [recipes.id],
  }),
}));

export const categories = createTable("categories", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  recipes: many(recipeCategories),
}));

export const recipeCategories = createTable("recipe_categories", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  recipeId: integer("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const recipeCategoriesRelations = relations(
  recipeCategories,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeCategories.recipeId],
      references: [recipes.id],
    }),
    category: one(categories, {
      fields: [recipeCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
