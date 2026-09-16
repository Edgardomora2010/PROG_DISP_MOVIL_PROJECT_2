/* Importación de la base de datos SQLite */
import { expoDb } from "@/data/db/client";

/* Inicializa la creación de tablas de la base de datos local */
export const init_DB_TablesCreation = () => {
  /* Creación de la tabla de recetas */
  expoDb.execSync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      ingredients TEXT NOT NULL,
      preparation TEXT NOT NULL,
      recipe_context TEXT DEFAULT 'modern'
    );
  `);

  /* Creación de la tabla de fuentes */
  expoDb.execSync(`
    CREATE TABLE IF NOT EXISTS sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      reference TEXT,
      url TEXT,
      created_at INTEGER NOT NULL
    );
  `);

  /* Creación de la tabla de recetas favoritas */
  expoDb.execSync(`
    CREATE TABLE IF NOT EXISTS favoriteList (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER NOT NULL,
      recipe_context TEXT NOT NULL,
      favorite INTEGER NOT NULL DEFAULT 0
    );
  `);

  /* Creación de la tabla de usuarios */
  expoDb.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      status INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL
    );
  `);
};

/* Elimina todas las tablas de la base de datos local.
   Función utilizada durante el desarrollo, ya que se tuvo
   que realizar varios cambios en la estructura de las tablas. */
export const delete_DB_Tables = () => {
  expoDb.execSync(`
    DROP TABLE IF EXISTS favoriteList;
    DROP TABLE IF EXISTS sources;
    DROP TABLE IF EXISTS recipes;
    DROP TABLE IF EXISTS users;
  `);
};
