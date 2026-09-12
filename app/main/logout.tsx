import { Redirect } from "expo-router";

/* Componente de cierre de sesión */
export default function Logout() {
  /* Al confirmarse cierre de sesión, desde el menú lateral,
  del drawer, se redirige automáticamente a la pantalla de logout,
  que redirige a su vez al login */
  return <Redirect href="/authenticate/login" />;
}
