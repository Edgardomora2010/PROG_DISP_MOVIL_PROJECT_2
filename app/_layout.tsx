/* Importación del componente Stack desde el paquete expo-router */
import { init_DB_TablesCreation } from "@/data/db/dbTableCreation";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useMedievalFonts } from "../styles/fonts";

/* Componente principal de la aplicación que se encarga de cargar
 las fuentes */
export default function RootLayout() {
  const [fontsLoaded] = useMedievalFonts();

  useEffect(() => {
    /* Elimina las tablas para reconstruir la base de datos */
    // Mantener comentada esta línea durante el desarrollo
    // para evitar la eliminación accidental de las tablas.

    // delete_DB_Tables();

    /* Crea nuevamente las tablas */
    init_DB_TablesCreation();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
