/* Importaciones de librerías y módulos necesarios para el componente */
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    ImageBackground,
    Pressable,
    Text,
    View,
} from "react-native";
import { RecipeContext } from "../components/recipeContext";
import { recipeService } from "../services/recipeServices";
import { componentStyles } from "../styles/components";
/* Importación del hook para operaciones CRUD de recetas */
import { useRecipeCRUD } from "../hooks/useRecipeCRUD";

/* Componente funcional RecipeComponent que representa la pantalla de
 recetas */
export default function RecipeComponent({ context }: RecipeContext) {
  /* Hook para operaciones CRUD de recetas */
  const { readAllRecipes, deleteRecipe, isFavoriteRecipe } = useRecipeCRUD();

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
  /* Estado local para almacenar las recetas favoritas */
  const [favoriteRecipes, setFavoriteRecipes] = useState<
    Record<string, boolean>
  >({});
  /* Función para generar la clave única de una receta favorita */
  const favoriteKey = (id: number, context: string) => `${context}-${id}`;
  /* Función para verificar el estado de favorito de una receta */
  const checkFavoriteStatus = async (id: number, context: string) => {
    /* Verifica si la receta es favorita */
    const favorite = await isFavoriteRecipe(id, context);

    setFavoriteRecipes((current) => ({
      ...current,
      [favoriteKey(id, context)]: favorite,
    }));
  };

  /* Actualiza el estado de favoritos al regresar a la pantalla */
  useFocusEffect(
    useCallback(() => {
      recipes.forEach((recipe) => {
        checkFavoriteStatus(recipe.id, context);
      });
    }, [recipes, context]),
  );

  /* useEffect para cargar las recetas al montar el componente */
  useEffect(() => {
    const loadRecipes = async () => {
      /* Limpia las recetas anteriores al cambiar de contexto */
      setRecipes([]);

      /* Si el contexto es medieval, se obtienen las recetas desde la API */
      if (context === "medieval") {
        const data = await recipeService.getRecipes();
        setRecipes(data);

        /* Verifica cuáles recetas están guardadas como favoritas */
        data.forEach((recipe) => {
          checkFavoriteStatus(recipe.id, context);
        });
      }

      /* Si el contexto es modern, se obtienen las recetas desde SQLite */
      if (context === "modern") {
        /* Cargar recetas desde SQLite */
        const data = await readAllRecipes();
        setRecipes(data);

        /* Verifica cuáles recetas están guardadas como favoritas */
        data.forEach((recipe) => {
          checkFavoriteStatus(recipe.id, context);
        });
      }

      /* Si el contexto es modern, se obtienen las recetas desde SQLite */
      if (context === "favorite") {
        /* Cargar recetas desde SQLite */
        // TODO
      }
    };

    loadRecipes();
  }, [context]);

  /* Solicita confirmación antes de eliminar una receta */
  const confirmDeleteRecipe = (id: number) => {
    Alert.alert("Eliminar receta", "¿Desea eliminar esta receta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          /* Elimina la receta de SQLite */
          await deleteRecipe(id);

          /* Elimina la receta de la lista mostrada */
          setRecipes((currentRecipes) =>
            currentRecipes.filter((recipe) => recipe.id !== id),
          );
        },
      },
    ]);
  };

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
                onPress={() =>
                  router.push({
                    pathname: "/main/recipeBook/[id]",
                    params: {
                      id: item.id.toString(),
                      context: context,
                    },
                  })
                }
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

                    {/* Muestra un corazón si la receta está guardada como favorita */}
                    {favoriteRecipes[favoriteKey(item.id, context)] && (
                      <Ionicons name="heart" size={20} color="#8B1E1E" />
                    )}

                    {/* Botón para eliminar recetas propias almacenadas en SQLite */}
                    {context === "modern" && (
                      <Pressable
                        style={componentStyles.recipeDeleteButton}
                        onPress={(event) => {
                          event.stopPropagation();
                          confirmDeleteRecipe(item.id);
                        }}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#FFFFFF"
                        />
                      </Pressable>
                    )}
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
