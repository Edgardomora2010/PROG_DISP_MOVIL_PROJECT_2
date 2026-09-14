/* Importación de la librería Drizzle ORM para SQLite en Expo */
import { drizzle } from "drizzle-orm/expo-sqlite";
/* Importación de la base de datos SQLite de Expo */
import { openDatabaseSync } from "expo-sqlite";

/* Creación y configuración de la base de datos SQLite de Expo */
export const expoDb = openDatabaseSync("localRecipes.db", {
  /* Habilita el listener de cambios en la base de datos */
  enableChangeListener: true,
});

/* Creación de la instancia de la base de datos Drizzle ORM */
export const db = drizzle(expoDb);
