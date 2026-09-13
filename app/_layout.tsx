/* Importación del componente Stack desde el paquete expo-router */
import { Stack } from "expo-router";
import { useMedievalFonts } from "../styles/fonts";

/* Componente principal de la aplicación que se encarga de cargar
 las fuentes */
export default function RootLayout() {
  const [fontsLoaded] = useMedievalFonts();

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
