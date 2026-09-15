/* Importación del componente Stack desde el paquete expo-router */
import { Stack } from "expo-router";
import { useMedievalFonts } from "../styles/fonts";
import { init_DB_TablesCreation } from "@/data/db/dbTableCreation";

/* Componente principal de la aplicación que se encarga de cargar
 las fuentes */
export default function RootLayout() {
  const [fontsLoaded] = useMedievalFonts();

  if (!fontsLoaded) {
    return null;
  }

  /* Inicializa la creación inicial de tablas de la base de datos local */
  init_DB_TablesCreation();

  return <Stack screenOptions={{ headerShown: false }} />;
}
