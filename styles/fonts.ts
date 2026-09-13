/* Importación de la función useFonts desde el paquete expo-font */
import { useFonts } from "expo-font";

/* Función personalizada para cargar las fuentes medievales */
export function useMedievalFonts() {
  return useFonts({
    OldeEnglish: require("../assets/fonts/OldeEnglish.ttf"),
    Brotheric: require("../assets/fonts/BrothericRegular.otf"),
  });
}
