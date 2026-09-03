import { StyleSheet } from "react-native";

/* Estilos de componentes reutilizables */

export const componentStyles = StyleSheet.create({
  /* ==================== TEXTOS ==================== */

  /* Título principal */

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 5,
  },

  /* Subtítulo */

  subtitle: {
    fontSize: 15,
    color: "#8B6F5A",
    marginBottom: 20,
  },

  /* Título de una tarjeta de libro */

  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 6,
  },

  /* Autor del libro */

  bookAuthor: {
    fontSize: 15,
    color: "#6D5141",
    marginBottom: 8,
  },

  /* Información adicional del libro */

  bookInfo: {
    fontSize: 13,
    color: "#8B6F5A",
    marginBottom: 3,
  },

  /* ==================== TARJETAS ==================== */

  /* Tarjeta utilizada para mostrar información de un libro */

  bookCard: {
    backgroundColor: "#FFFDF8",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2D5C5",
  },

  /* ==================== INPUTS ==================== */

  /* Campo de entrada de texto */

  input: {
    backgroundColor: "#FFFDF8",
    borderWidth: 1,
    borderColor: "#D8C7B5",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: "#5C4033",
  },

  /* ==================== BOTONES ==================== */

  /* Botón para explorar la biblioteca */

  libraryButton: {
    backgroundColor: "#6B4F3A",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },

  /* Texto del botón para explorar la biblioteca */

  libraryButtonText: {
    color: "#F4D06F",
    fontSize: 15,
    fontWeight: "bold",
  },

  /* Botón de inicio de sesión */

  loginButton: {
    backgroundColor: "#6B4F3A",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },

  /* Texto del botón de inicio de sesión */

  loginButtonText: {
    color: "#F4D06F",
    fontSize: 16,
    fontWeight: "bold",
  },
});