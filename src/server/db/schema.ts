// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
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
  source: text(),
  prepTime: integer(),
  cookTime: integer(),
  totalTime: integer(),
  servings: integer(),
  difficulty: varchar({ length: 256 }),
  ingredients: text().array(),
  instructions: text().array(),
  tags: text().array(),
  nutritionId: integer().references(() => nutrition.id),
  sourceId: integer().references(() => source.id),
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
});

export const recipeRelations = relations(recipes, ({ one }) => ({
  nutrition: one(nutrition, {
    fields: [recipes.nutritionId],
    references: [nutrition.id],
  }),
  source: one(source, {
    fields: [recipes.sourceId],
    references: [source.id],
  }),
}));
