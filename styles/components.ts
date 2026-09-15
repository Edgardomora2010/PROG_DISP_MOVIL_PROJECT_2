import { StyleSheet } from "react-native";

/* Se reutiliza el archivo de estilos de otros proyectos ya
   que se pueden aplicar los mismos estilos a los componentes 
  de esta aplicación. */

/* ************************************************* */
/* ESTILOS GENERALES DE COMPONENTES                  */
/* ************************************************* */

export const componentStyles = StyleSheet.create({
  /* ************************************************* */
  /*                     TEXTOS                        */
  /* ************************************************* */

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

  /* ************************************************* */
  /*                     TARJETAS                      */
  /* ************************************************* */

  /* Tarjeta utilizada para mostrar información de un libro */
  bookCard: {
    backgroundColor: "#FFFDF8",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2D5C5",
  },

  /* ************************************************* */
  /*                     INPUTS                        */
  /* ************************************************* */

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

  /* ************************************************* */
  /*                     BOTONES                       */
  /* ************************************************* */

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

  /* Botón pequeño para eliminar recetas propias */
  recipeDeleteButton: {
    width: 40,
    height: 32,
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
     borderRadius: 6,
     backgroundColor: "#8B2E2E",
},

  /* ************************************************* */
  /*                 MENÚ DE NAVEGACIÓN                */
  /* ************************************************* */

  /* Estilo del menú lateral */
  drawerStyle: {
    backgroundColor: "#F5EFE6",
    width: 300,
  },

  /* Estilo del texto de las opciones del menú */
  drawerLabelStyle: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    /*color: "#5C4033",*/
  },

  /* Espacio y forma de las opciones del menú */
  drawerItemStyle: {
    borderRadius: 8,
    marginVertical: 4,
  },

  /* ************************************************* */
  /*              CATALOGO DE RECETAS                  */
  /* ************************************************* */

  /* Fondo de la pantalla de recetas */
  recipeBackground: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
  },

  /* Fondo del catálogo de recetas */
  recipePaper: {
    marginLeft: -10,
    width: "102%",
    height: "90%",
    alignSelf: "center",
    overflow: "hidden",
  },

  /* Contenedor de la lista de recetas */
  recipeListContainer: {
    /* flex: 1,*/
    width: "98%",
    height: "80%",
    paddingTop: 40,
  },

  recipeList: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },

  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 253, 248, 0.80)",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#77520d",
  },

  recipeItemPressed: {
    backgroundColor: "#6B4F3A",
    transform: [{ scale: 0.98 }],
  },

  recipeLabel: {
    flex: 1,
    fontSize: 30,
    /* fontWeight: "bold",  fuentes personalizadas medievales 
    no funcionan con la propiedad bold asignada originalmente 
    para hoja de estilos */
    color: "#5C4033",
    fontFamily: "OldeEnglish",
    marginHorizontal: 14,
  },

  recipeLabelPressed: {
    color: "#F4D06F",
    fontSize: 30,
    fontFamily: "OldeEnglish",
  },

  /* Estilos del pie de página del catálogo */
  recipeFooter: {
    width: "95%",
    alignSelf: "center",
    marginTop: -40,
    paddingVertical: 10,
    backgroundColor: "#F5EFE6",
    borderWidth: 2,
    borderColor: "#77520d",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  recipeFooterItem: {
    alignItems: "center",
    paddingHorizontal: 15,
  },

  recipeFooterText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "bold",
    color: "#6B4F3A",
  },

  /* ************************************************* */
  /*              DETALLE DE LA RECETA                 */
  /* ************************************************* */

  /* Contenedor general del detalle de la receta */
  recipeDetailsContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },

  /* Contenido desplazable del detalle */
  recipeDetailsContent: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    paddingBottom: 20,
  },

  /* Encabezado de la receta */
  recipeDetailsHeader: {
    paddingVertical: 10,
    marginBottom: 8,
    paddingHorizontal: 0,
  },

  /* Título de la receta */
  recipeDetailsTitle: {
    fontSize: 45,
    fontFamily: "OldeEnglish",
    color: "#FFF8E7",
    textShadowColor: "#6B4F3A",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    marginBottom: 5,
  },

  /* Título original de la receta */
  recipeDetailsOriginalTitle: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#fbf7f3",
  },

  /* Tarjeta de ingredientes e imagen */
  recipeIngredientsCard: {
    backgroundColor: "#FFFDF8",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2D5C5",
    flexDirection: "row",
  },

  /* Contenedor de los ingredientes */
  recipeIngredientsContent: {
    flex: 1,
    paddingRight: 12,
  },

  /* Imagen de la receta */
  recipeDetailsImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8AA7A",
  },

  /* Espacio temporal para la imagen de la receta */
  recipeDetailsImagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8AA7A",
    backgroundColor: "#E8D7BD",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Texto del espacio temporal de imagen */
  recipeDetailsImageText: {
    marginTop: 5,
    fontSize: 12,
    color: "#8B6F5A",
  },

  /* Título de las secciones */
  recipeSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 20,
  },

  /* Ingrediente individual */
  recipeIngredient: {
    fontSize: 14,
    color: "#6D5141",
    marginBottom: 5,
  },

  /* Texto de las secciones */
  recipeDetailsText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6D5141",
    textAlign: "justify",
  },

  /* Tarjeta de información histórica y preparación */
  recipeDetailsCard: {
    backgroundColor: "#FFFDF8",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2D5C5",
  },

  /* Información de la fuente */
  recipeSourceText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#8B6F5A",
    marginBottom: 4,
  },

  /* Contenedor de las acciones del detalle */
  recipeDetailsActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#F5EFE6",
    borderWidth: 1,
    borderColor: "#C8AA7A",
    borderRadius: 14,
  },

  /* Botón de acción del detalle */
  recipeDetailsAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  /* Texto de los botones de acción */
  recipeDetailsActionText: {
    marginLeft: 7,
    fontSize: 14,
    fontWeight: "bold",
    color: "#6B4F3A",
  },

  /* Texto para elementos con viñetas */
  bulletText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 19,
    color: "#8B6F5A",
    marginBottom: 10,
  },

  /* ************************************************* */
  /*              CATÁLOGO DE HISTORIA                 */
  /* ************************************************* */

  /* Encabezado del catálogo histórico */
  historyHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },

  historyActions: {
  marginHorizontal: 10,
  },

  /* Espacio reservado para el mapa medieval */
  historyMapPlaceholder: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  /* Texto del espacio reservado para el mapa */
  historyMapText: {
    marginTop: 8,
    fontSize: 14,
    color: "#8B6F5A",
  },

  /* Contenedor de la lista de lugares */
  historyListContainer: {
    flex: 1,
  },

  /* Lista de lugares */
  historyList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 0,
  },

  /* Tarjeta de un lugar histórico */
  historyItem: {
    backgroundColor: "rgba(255, 253, 248, 0.90)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#77520d",
  },

  /* Imagen del lugar histórico */
  historyImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8AA7A",
  },

  /* Espacio temporal para la imagen */
  historyImagePlaceholder: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C8AA7A",
    backgroundColor: "#E8D7BD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  /* Texto del espacio temporal de imagen */
  historyImageText: {
    marginTop: 5,
    fontSize: 12,
    color: "#8B6F5A",
  },

  /* Nombre del lugar */
  historyTitle: {
    fontSize: 28,
    fontFamily: "OldeEnglish",
    color: "#5C4033",
    marginBottom: 8,
  },

  /* Descripción del lugar */
  historyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6D5141",
    marginBottom: 10,
  },

  /* Contexto histórico del lugar */
  historyContext: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6D5141",
    marginBottom: 10,
  },

  /* Coordenadas del lugar */
  historyCoordinates: {
    fontSize: 13,
    lineHeight: 19,
    color: "#8B6F5A",
  },

/* ************************************************* */
/*              CREACIÓN DE RECETAS                  */
/* ************************************************* */

/* Contenido desplazable de creación de receta */
newRecipeContent: {
  paddingHorizontal: 10,
  paddingBottom: 20,
},

/* Tarjeta utilizada para las secciones del formulario */
newRecipeCard: {
  backgroundColor: "rgba(255, 253, 248, 0.90)",
  padding: 16,
  borderRadius: 12,
  marginBottom: 14,
  borderWidth: 2,
  borderColor: "#77520d",
},

/* Campo general del formulario */
newRecipeInput: {
  backgroundColor: "#FFFDF8",
  borderWidth: 1,
  borderColor: "#C8AA7A",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  color: "#5C4033",
  fontSize: 15,
},

/* Fila para agregar un ingrediente */
newRecipeIngredientRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
},

/* Campo para escribir un ingrediente */
newRecipeIngredientInput: {
  flex: 1,
  backgroundColor: "#FFFDF8",
  borderWidth: 1,
  borderColor: "#C8AA7A",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  color: "#5C4033",
  fontSize: 15,
},

/* Botón para agregar un ingrediente */
newRecipeAddButton: {
  backgroundColor: "#6B4F3A",
  marginLeft: 8,
  width: 45,
  height: 45,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
},

/* Contenedor donde se muestran los ingredientes agregados */
newRecipeIngredientsBox: {
  minHeight: 80,
  backgroundColor: "#FFFDF8",
  borderWidth: 1,
  borderColor: "#C8AA7A",
  borderRadius: 8,
  padding: 12,
},

/* Texto mostrado cuando todavía no existen ingredientes */
newRecipeEmptyText: {
  fontSize: 13,
  color: "#8B6F5A",
  fontStyle: "italic",
},

/* Campo de preparación de la receta */
newRecipePreparationInput: {
  minHeight: 140,
  backgroundColor: "#FFFDF8",
  borderWidth: 1,
  borderColor: "#C8AA7A",
  borderRadius: 8,
  padding: 12,
  color: "#5C4033",
  fontSize: 15,
  lineHeight: 21,
},

/* Botón para limpiar la receta */
newRecipeClearButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  marginBottom: 5,
  borderWidth: 1,
  borderColor: "#C8AA7A",
  borderRadius: 8,
  backgroundColor: "#F5EFE6",
},

/* Texto del botón para limpiar */
newRecipeClearButtonText: {
  marginLeft: 7,
  fontSize: 14,
  fontWeight: "bold",
  color: "#6B4F3A",
},


});
