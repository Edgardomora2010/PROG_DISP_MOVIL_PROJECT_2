/* Importación de navegación */
import { useLocalSearchParams } from "expo-router";
/* Importación del componente catálogo de recetas */
import RecipeComponent from "../../../components/recipeComponent";
/* Importación del tipo de contexto */
import { RecipeContext } from "../../../components/recipeContext";

/* PANTALLA PARA VISUALIZACION DE LISTA DE RECETAS */

/* Componente principal de la sección de recetas */
export default function RecipeBook() {
  /* Recibe el contexto enviado desde Home */
  const { context } = useLocalSearchParams();

  return (
    /* Renderiza el componente de recetas según el contexto */
    <RecipeComponent
      context={context as RecipeContext["context"]}
    />
  );
}