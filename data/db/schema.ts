/* Importación de los módulos necesarios de Drizzle ORM para definir
 el esquema de la base de datos SQLite */
/* Importación de los módulos necesarios de Drizzle ORM para definir
 el esquema de la base de datos SQLite */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* Definición de la tabla de recetas */
export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  ingredients: text("ingredients").notNull(),
  preparation: text("preparation").notNull(),
  recipe_context: text("recipe_context").default("modern"),
});

/* Definición de la tabla de fuentes */
export const sources = sqliteTable("sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  reference: text("reference"),
  url: text("url"),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
});

/* Definición de la tabla de lista de recetas favoritas */
export const favoriteList = sqliteTable("favoriteList", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recipe_id: integer("recipe_id").notNull(),
  recipe_context: text("recipe_context").notNull(),
  favorite: integer("favorite", { mode: "boolean" }).notNull().default(false),
});
