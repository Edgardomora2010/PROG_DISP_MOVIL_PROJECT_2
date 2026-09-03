/* Importación del componente Redirect de Expo Router */
import { Redirect } from "expo-router";

/* Componente de la pantalla de índice */
export default function Index() {
  /* Redirige automáticamente a la pantalla de inicio de sesión */
  return <Redirect href="/authenticate/login" />;
}
