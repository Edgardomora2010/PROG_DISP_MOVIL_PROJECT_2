/* Importaciones de React */
import { useState } from "react";
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
/* Importación de useFonts para cargar fuentes personalizadas */

/* Componente para mostrar el detalle de una receta */
export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
  /* Estado temporal para controlar si la receta es favorita */
  const [isFavorite, setIsFavorite] = useState(false);

  /* Separar los ingredientes utilizando el punto y coma */
  const ingredients = recipe.ingredients.split(";");

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

          <Text style={componentStyles.recipeDetailsOriginalTitle}>
            {recipe.title_en}
          </Text>
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
        <View style={componentStyles.recipeDetailsCard}>
          <Text style={componentStyles.recipeSectionTitle}>
            Contexto histórico
          </Text>

          <Text style={componentStyles.recipeDetailsText}>
            {recipe.history}
          </Text>

          <Text style={componentStyles.recipeSourceText}>
            Período: {recipe.period}
          </Text>
        </View>

        {/* Fuente */}
        <View style={componentStyles.recipeDetailsCard}>
          <Text style={componentStyles.recipeSectionTitle}>Fuente</Text>

          <Text style={componentStyles.recipeSourceText}>
            {recipe.source_name}
          </Text>

          <Text style={componentStyles.recipeSourceText}>
            Autor: {recipe.source_author}
          </Text>

          <Text style={componentStyles.recipeSourceText}>
            Referencia: {recipe.source_reference}
          </Text>
        </View>

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
            onPress={() => setIsFavorite(!isFavorite)}
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
