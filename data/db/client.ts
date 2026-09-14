/* Importación de la base de datos SQLite de Expo */
import { openDataBaseSync } from "expo-sqlite";


export const expoDb = openDataBaseSync("localRecipes.db", {
  enableChangeListener: true,
});
