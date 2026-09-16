/* Importaciones de React y React Native */
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
/* Importación del parámetro de navegación */
import { useLocalSearchParams } from "expo-router";
/* Importación del servicio de recetas */
import { recipeService } from "../../../services/recipeServices";
/* Importación del componente de detalle */
import RecipeDetails from "../../../components/recipeDetailComponent";
/* Importación del tipo Recipe */
import { Recipe } from "../../../lib/api/types";
/* Importación de estilos */
import { layoutStyles } from "../../../styles/layout";
/* Importación del hook para operaciones CRUD de recetas */
import { useRecipeCRUD } from "../../../hooks/useRecipeCRUD";

/* Componente principal del detalle de la receta */
export default function RecipeDetailScreen() {

  /* Obtiene el ID y el contexto de la receta desde la ruta */
  const { id, context } = useLocalSearchParams<{
    id: string;
    context: "medieval" | "modern";
  }>();

  /* Estado para almacenar la receta */
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  /* Estado para controlar la carga */
  const [loading, setLoading] = useState(true);
  /* Estado para controlar errores */
  const [error, setError] = useState<string | null>(null);
  /* Obtiene la función para leer una receta local */
  const { readOneRecipe } = useRecipeCRUD();
  /* Carga la receta según su origen */
  useEffect(() => {

    const loadRecipe = async () => {
      try {

        setLoading(true);
        setError(null);

        /* Si el contexto es medieval, obtiene la receta desde el API */
        if (context === "medieval") {
          const data = await recipeService.getRecipeById(Number(id));
          setRecipe(data);
        }

        /* Si el contexto es moderno, obtiene la receta desde SQLite */
        if (context === "modern") {
          const data = await readOneRecipe(Number(id));

          if (data.length > 0) {

            /* Obtiene la receta local */
            const localRecipe = data[0];

            /* Adapta la receta local a la definición completa de Recipe */
            const adaptedRecipe: Recipe = {
              id: localRecipe.id,
              created_at: "",
              title: localRecipe.title,
              title_en: "",
              place: "",
              period: "",
              history: "",
              ingredients: localRecipe.ingredients,
              preparation: localRecipe.preparation,
              source_name: "",
              source_author: "",
              source_reference: "",
              source_url: "",
              latitude: null,
              longitude: null,
              source_id: null,
              place_id: null,
              image_url: null,
              recipe_context: "modern",
            };

            setRecipe(adaptedRecipe);

          } else {
            setRecipe(null);
          }
        }

      } catch (error) {
        setError("No se pudo obtener la receta.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();

  }, [id, context]);

  /* Muestra indicador mientras carga la receta */
  if (loading) {
    return (
      <View style={layoutStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /* Muestra mensaje de error */
  if (error) {
    return (
      <View style={layoutStyles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  /* Muestra mensaje si no se encontró la receta */
  if (!recipe) {
    return (
      <View style={layoutStyles.container}>
        <Text>Receta no encontrada.</Text>
      </View>
    );
  }

  /* Muestra el detalle de la receta */
  return <RecipeDetails recipe={recipe} />;
}