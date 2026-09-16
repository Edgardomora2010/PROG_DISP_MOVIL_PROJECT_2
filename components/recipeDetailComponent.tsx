/* Importaciones de React */
import { useEffect, useState } from "react";
/* Importaciones de React Native */
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";
/* Importación de router */
import { router } from "expo-router";
/* Importación de estilos */
import { componentStyles } from "../styles/components";
/* Importación del tipo Recipe */
import { Recipe } from "../lib/api/types";
/* Importación del hook para operaciones CRUD de recetas */
import { useRecipeCRUD } from "@/hooks/useRecipeCRUD";

/* PANTALLA PARA MOSTRAR EL DETALLE DE UNA RECETA */

/* Componente para mostrar el detalle de una receta */
export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
  /* Estado temporal para controlar si la receta es favorita */
  const [isFavorite, setIsFavorite] = useState(false);

  /* Separar los ingredientes utilizando el punto y coma */
  const ingredients = recipe.ingredients.split(";");

  /* Obtiene datos relevantes de la receta */
  const recipeType = recipe.recipe_context;
  const recipeId = recipe.id;
  const recipeFavoriteStatus = isFavorite;

  /* Obtiene las operaciones CRUD de recetas */
  const { updateOrInsertFavoriteRecipe } = useRecipeCRUD();
  const { isFavoriteRecipe } = useRecipeCRUD();

  /* useEffect para verificar el estado de favorito al montar el componente */
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favoriteStatus = await isFavoriteRecipe(recipeId, recipeType);
      setIsFavorite(favoriteStatus);
    };
    checkFavoriteStatus();
  }, []);

  /* Guarda lista de recetas favoritas en la base de datos */
  const saveInDB = async () => {
    try {
      /* Guarda la receta mediante el hook de operaciones CRUD */
      await updateOrInsertFavoriteRecipe(recipeId, recipeType);

      return true;
    } catch (error) {
      console.error("Error al guardar la receta en la base de datos:", error);
      return false;
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/wood_background.png")}
      style={componentStyles.recipeBackground}
      resizeMode="cover"
    >
      <ScrollView
        style={componentStyles.recipeDetailsContainer}
        contentContainerStyle={componentStyles.recipeDetailsContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado de la receta */}
        <View style={componentStyles.recipeDetailsHeader}>
          <Text
            style={{
              fontFamily: "OldeEnglish",
              fontSize: 50,
              color: "#fbf7f3",
            }}
          >
            {recipe.title}
          </Text>

          {/* Muestra el título original solamente si existe */}
          {recipe.title_en && (
            <Text style={componentStyles.recipeDetailsOriginalTitle}>
              {recipe.title_en}
            </Text>
          )}
        </View>

        {/* Ingredientes e imagen */}
        <View style={componentStyles.recipeIngredientsCard}>
          <View style={componentStyles.recipeIngredientsContent}>
            <Text style={componentStyles.recipeSectionTitle}>Ingredientes</Text>

            {ingredients.map((ingredient, index) => (
              <Text key={index} style={componentStyles.recipeIngredient}>
                • {ingredient.trim()}
              </Text>
            ))}
          </View>

          {recipe.image_url ? (
            <Image
              source={{ uri: recipe.image_url }}
              style={componentStyles.recipeDetailsImage}
            />
          ) : (
            <View style={componentStyles.recipeDetailsImagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#8B6F5A" />

              <Text style={componentStyles.recipeDetailsImageText}>Imagen</Text>
            </View>
          )}
        </View>

        {/* Preparación */}
        <View style={componentStyles.recipeDetailsCard}>
          <Text style={componentStyles.recipeSectionTitle}>Preparación</Text>

          <Text style={componentStyles.recipeDetailsText}>
            {recipe.preparation}
          </Text>
        </View>

        {/* Contexto histórico */}
        {(recipe.history || recipe.period) && (
          <View style={componentStyles.recipeDetailsCard}>
            <Text style={componentStyles.recipeSectionTitle}>
              Contexto histórico
            </Text>

            {/* Muestra el contexto histórico solamente si existe */}
            {recipe.history && (
              <Text style={componentStyles.recipeDetailsText}>
                {recipe.history}
              </Text>
            )}

            {/* Muestra el período solamente si existe */}
            {recipe.period && (
              <Text style={componentStyles.recipeSourceText}>
                Período: {recipe.period}
              </Text>
            )}
          </View>
        )}

        {/* Fuente */}
        {(recipe.source_name ||
          recipe.source_author ||
          recipe.source_reference) && (
          <View style={componentStyles.recipeDetailsCard}>
            <Text style={componentStyles.recipeSectionTitle}>Fuente</Text>

            {/* Muestra el nombre de la fuente solamente si existe */}
            {recipe.source_name && (
              <Text style={componentStyles.recipeSourceText}>
                {recipe.source_name}
              </Text>
            )}

            {/* Muestra el autor solamente si existe */}
            {recipe.source_author && (
              <Text style={componentStyles.recipeSourceText}>
                Autor: {recipe.source_author}
              </Text>
            )}

            {/* Muestra la referencia solamente si existe */}
            {recipe.source_reference && (
              <Text style={componentStyles.recipeSourceText}>
                Referencia: {recipe.source_reference}
              </Text>
            )}
          </View>
        )}

        {/* Acciones del detalle */}
        <View style={componentStyles.recipeDetailsActions}>
          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={25} color="#6B4F3A" />

            <Text style={componentStyles.recipeDetailsActionText}>Volver</Text>
          </Pressable>

          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={async () => {
              const saved = await saveInDB();

              if (saved) {
                setIsFavorite(!isFavorite);
              }
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={25}
              color={isFavorite ? "#8B1E1E" : "#6B4F3A"}
            />

            <Text style={componentStyles.recipeDetailsActionText}>
              {isFavorite ? "Favorita" : "Registrar"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
