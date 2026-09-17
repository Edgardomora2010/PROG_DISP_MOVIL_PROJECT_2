/* Importación del componente Stack desde el paquete expo-router */
import { init_DB_TablesCreation } from "@/data/db/dbTableCreation";
/* Importación del hook para insertar datos iniciales en la base de datos */
import { useDBInsertTableData } from "@/data/db/dbInsertTableData";
import { Stack } from "expo-router";
import { useEffect } from "react";
/* Importación del hook para cargar las fuentes medievales */
import { useMedievalFonts } from "../styles/fonts";
/* Importación del proveedor de recetas favoritas */
import { FavoriteRecipesProvider } from "@/context/favoriteRecipes";

/* Componente principal de la aplicación que se encarga de cargar
 las fuentes */
export default function RootLayout() {
  /* Inicialización de la base de datos y carga de fuentes */
  const [fontsLoaded] = useMedievalFonts();
  const { insertDefaultUserData } = useDBInsertTableData();

  /* Inicializa las tablas de la base de datos */
  useEffect(() => {
    // **************************************************
    // delete_DB_Tables();
    // **************************************************

    init_DB_TablesCreation();
  }, []);

  /* Inserta los datos iniciales */
  useEffect(() => {
    insertDefaultUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FavoriteRecipesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FavoriteRecipesProvider>
  );
}
