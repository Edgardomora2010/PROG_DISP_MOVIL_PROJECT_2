/* Importaciones de librerías y módulos necesarios para el componente */
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
import { recipeService } from "../services/recipeServices";
import { componentStyles } from "../styles/components";

/* Componente funcional RecipeComponent que representa la pantalla de
 recetas */
export default function RecipeComponent() {
  /*  Datos de prueba para la lista de recetas, se pueden reemplazar
   por datos obtenidos de una API o base de datos 
  const recipes = [
    { id: "1", title: "Sopa de calabaza con queso" },
    { id: "2", title: "Flaó" },
    { id: "3", title: "Sosenga de conejo" },
    { id: "4", title: "Piment" },

  ];*/

  /* Estado local para almacenar la lista de recetas obtenidas de la API */
  const [recipes, setRecipes] = useState<{ id: number; title: string }[]>([]);

  /* useEffect para cargar las recetas al montar el componente */
  useEffect(() => {
    const loadRecipes = async () => {
      const data = await recipeService.getRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  return (
    /* Se utiliza un fondo de madera para la pantalla de recetas */
    <ImageBackground
      source={require("../assets/images/wood_background.png")}
      style={componentStyles.recipeBackground}
      resizeMode="cover"
    >
      {/* Se utiliza un fondo de pergamino antiguo para la lista de recetas */}
      <ImageBackground
        source={require("../assets/images/recipes_backgroud.png")}
        style={componentStyles.recipePaper}
        resizeMode="stretch"
      >
        {/* Contenedor de la lista de recetas */}
        <View style={componentStyles.recipeListContainer}>
          {/* FlatList para mostrar la lista de recetas obtenidas de la API */}
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={componentStyles.recipeList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  componentStyles.recipeItem,
                  pressed && componentStyles.recipeItemPressed,
                ]}
                onPress={() => router.push(`/main/recipeBook/${item.id}`)}
              >
                {({ pressed }) => (
                  <>
                    <Ionicons
                      name="restaurant-outline"
                      size={28}
                      color={pressed ? "#F4D06F" : "#6B4F3A"}
                    />

                    <Text
                      style={[
                        componentStyles.recipeLabel,
                        pressed && componentStyles.recipeLabelPressed,
                      ]}
                    >
                      {item.title}
                    </Text>

                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color={pressed ? "#F4D06F" : "#6B4F3A"}
                    />
                  </>
                )}
              </Pressable>
            )}
          />
        </View>
      </ImageBackground>

      {/* Pie de página con botones de navegación */}
      <View style={componentStyles.recipeFooter}>
        <Pressable
          style={componentStyles.recipeFooterItem}
          onPress={() => router.replace("/main/tabs")}
        >
          <Ionicons name="home-outline" size={24} color="#6B4F3A" />
          <Text style={componentStyles.recipeFooterText}>Inicio</Text>
        </Pressable>

        <Pressable
          style={componentStyles.recipeFooterItem}
          onPress={() => router.push("/main/recipeBook/newRecipe")}
        >
          <Ionicons name="add-circle-outline" size={24} color="#6B4F3A" />
          <Text style={componentStyles.recipeFooterText}>Crear receta</Text>
        </Pressable>

        <Pressable style={componentStyles.recipeFooterItem}>
          <Ionicons name="heart-outline" size={24} color="#6B4F3A" />
          <Text style={componentStyles.recipeFooterText}>Favoritos</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
