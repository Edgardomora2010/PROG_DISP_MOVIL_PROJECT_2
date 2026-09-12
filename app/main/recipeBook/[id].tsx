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

/* Componente principal del detalle de la receta */
export default function RecipeDetailScreen() {
  /* Obtiene el ID de la receta desde la ruta */
  const { id } = useLocalSearchParams<{ id: string }>();
  /* Estado para almacenar la receta */
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  /* Estado para controlar la carga */
  const [loading, setLoading] = useState(true);
  /* Estado para almacenar posibles errores */
  const [error, setError] = useState<string | null>(null);

  /* Obtiene la receta desde la API cuando cambia el ID */
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await recipeService.getRecipeById(Number(id));
        setRecipe(data);
      } catch (error) {
        setError("No se pudo obtener la receta.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  /* Muestra un indicador mientras se obtiene la receta */
  if (loading) {
    return (
      <View style={layoutStyles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando receta...</Text>
      </View>
    );
  }

  /* Muestra el mensaje si ocurre un error */
  if (error) {
    return (
      <View style={layoutStyles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  /* Muestra el detalle cuando la receta fue obtenida */
  if (!recipe) {
    return (
      <View style={layoutStyles.container}>
        <Text>No se encontró la receta.</Text>
      </View>
    );
  }

  return <RecipeDetails recipe={recipe} />;
}
