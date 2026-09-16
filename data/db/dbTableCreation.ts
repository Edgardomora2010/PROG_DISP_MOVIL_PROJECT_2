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

  /* Eliminación de la tabla de recetas favoritas, se requiere borrar 
  por pruebas en tablas de base de datos, y campos que no estaban completos */
  // expoDb.execSync(`
  // DROP TABLE IF EXISTS favoriteList/recipes/sources;
  // `);
};
