/* Importación de la librería StyleSheet de React Native 
para crear estilos */
import { StyleSheet } from "react-native";

/* ************************************************* */
/* ESTILOS GENERALES DE ESTRUCTURA Y DISTRIBUCIÓN    */
/* ************************************************* */

/* Por razones de tiempo, no fue posible renombrar muchos componentes
de la hoja de estilo, a nombres mas descriptivos propios del proyecto
actual (recetario) ya que fue en gran parte recolectado o reutilizado
de los laboratorios anteriores, en los que se diseñó una app de biblioteca
y el portafolio, por lo tanto ciertos componentes guardan dichos nombres */

export const layoutStyles = StyleSheet.create({
  /* Contenedor general de las pantallas */
  container: {
    flex: 1,
    backgroundColor: "#F5EFE6",
    padding: 20,
  },

  /* Contenedor de la pantalla de inicio de sesión */
  loginContainer: {
    flex: 1,
    backgroundColor: "#F5EFE6",
    padding: 25,
    justifyContent: "center",
  },

  /* Imagen principal de la biblioteca */
  libraryImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },

  /* Imagen principal de la biblioteca */
  appFrontCover: {
    width: "100%",
    height: 400,
  },

  /* Imagen del usuario en la biblioteca */
  libraryUser: {
    width: 300,
    height: "50%",
    borderRadius: 12,
    marginBottom: 20,
  },
});
