/* Importación de la función Redirect desde el paquete expo-router */
import { Redirect } from "expo-router";
/* Componente principal de la aplicación que se encarga de redirigir
a la ruta /main/tabs, que es la pantalla principal de la aplicación. */
export default function MainIndex() {
  return <Redirect href="/main/tabs" />;
}
