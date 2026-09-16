/* Importaciones de librerías y módulos necesarios para el componente */
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    ImageBackground,
    Pressable,
    Text,
    View,
} from "react-native";
/* Importación del contexto de recetas (medieval y moderno) */
import { RecipeContext } from "../components/recipeContext";
/* Importación del servicio API de recetas */
import { recipeService } from "../services/recipeServices";
/* Importación de los estilos del componente */
import { componentStyles } from "../styles/components";
/* Importación del hook para operaciones CRUD de recetas */
import { useRecipeCRUD } from "../hooks/useRecipeCRUD";

/* COMPONENTE RECIPECOMPONENT PARA MANEJAR LISTAS DE RECETAS
 (MEDIEVAL, MODERNO Y FAVORITAS) */

/* Componente funcional RecipeComponent que representa la pantalla de
 recetas */
export default function RecipeComponent({ context }: RecipeContext) {
  /* Hook para operaciones CRUD de recetas */
  const {
    readAllRecipes,
    deleteRecipe,
    isFavoriteRecipe,
    areThereFavoriteRecipes,
    getAllFavoriteRecipes,
  } = useRecipeCRUD();

  /*  Datos de prueba para la lista de recetas, se pueden reemplazar
   por datos obtenidos de una API o base de datos 
  const recipes = [
    { id: "1", title: "Sopa de calabaza con queso" },
    { id: "2", title: "Flaó" },
    { id: "3", title: "Sosenga de conejo" },
    { id: "4", title: "Piment" },

  ];*/

  /* Estado local para almacenar la lista de recetas obtenidas de la API */
  const [recipes, setRecipes] = useState<
    {
      id: number;
      title: string;
      recipe_context?: string | null;
    }[]
  >([]);

  /* Estado para controlar la carga de recetas */
  const [loading, setLoading] = useState(false);
  /* Estado para controlar errores al cargar recetas */
  const [error, setError] = useState<string | null>(null);
  /* Estado local para almacenar las recetas favoritas */
  const [favoriteRecipes, setFavoriteRecipes] = useState<
    Record<string, boolean>
  >({});
  /* Estado local para indicar si hay recetas favoritas disponibles */
  const [favoriteRecipesStatus, setFavoriteRecipesStatus] = useState(false);
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
      try {
        setLoading(true);
        setError(null); // Reinicia el estado de error al comenzar a cargar recetas

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

        /* Si el contexto es favorite, se obtienen las recetas favoritas
      almacenadas tanto en la API como en SQLite */
        if (context === "favorite") {
          /* Carga la lista completa de recetas favoritas consultando al sql,
        la lista contiene la información de recetas en sql y las del api */
          const favData = await getAllFavoriteRecipes();

          /* Carga las recetas medievales */
          const medievalData = await recipeService.getRecipes();
          /* Filtra las recetas medievales favoritas y conserva su contexto */
          const medievalFavorites = medievalData
            .filter((recipe) =>
              favData.some(
                (fav) =>
                  fav.recipe_id === recipe.id &&
                  fav.recipe_context === "medieval",
              ),
            )
            .map((recipe) => ({
              ...recipe,
              recipe_context: "medieval",
            }));

          /* Carga las recetas modernas */
          const modernData = await readAllRecipes();
          /* Filtra las recetas modernas favoritas y conserva su contexto */
          const modernFavorites = modernData
            .filter((recipe) =>
              favData.some(
                (fav) =>
                  fav.recipe_id === recipe.id &&
                  fav.recipe_context === "modern",
              ),
            )
            .map((recipe) => ({
              ...recipe,
              recipe_context: "modern",
            }));

          /* Une las recetas favoritas medievales y modernas */
          setRecipes([...medievalFavorites, ...modernFavorites]);
        }
      } catch (error) {
        console.error("Error al cargar las recetas:", error);
        setError("No se pudieron cargar las recetas.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [context]);

  /* Se cambia de useEffect a useFocusEffect, ya que no funciona al recargar la pantalla
  para verificar las recetas favoritas al montar el componente */
  useFocusEffect(
    useCallback(() => {
      const checkFavoriteRecipes = async () => {
        const favoriteRecipesStatus = await areThereFavoriteRecipes(context);
        setFavoriteRecipesStatus(favoriteRecipesStatus);
      };

      checkFavoriteRecipes();
    }, [context]),
  );

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
          {loading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            /* FlatList para mostrar la lista de recetas obtenidas de la API */
            <FlatList
              data={recipes}
              keyExtractor={(item, index) =>
                `${context}-${item.recipe_context ?? "recipe"}-${item.id}-${index}`
              }
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
                        context:
                          context === "favorite"
                            ? (item.recipe_context ?? "medieval")
                            : context,
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
                      {favoriteRecipes[
                        favoriteKey(
                          item.id,
                          context === "favorite"
                            ? (item.recipe_context ?? "medieval")
                            : context,
                        )
                      ] && <Ionicons name="heart" size={20} color="#8B1E1E" />}

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
          )}
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

        <Pressable
          style={componentStyles.recipeFooterItem}
          onPress={() => {
            if (favoriteRecipesStatus) {
              router.push({
                pathname: "/main/recipeBook",
                params: {
                  context: "favorite",
                },
              });
            }
          }}
        >
          <Ionicons
            name={favoriteRecipesStatus ? "heart" : "heart-outline"}
            size={24}
            color={favoriteRecipesStatus ? "#8B1E1E" : "#6B4F3A"}
          />
          <Text style={componentStyles.recipeFooterText}>Favoritos</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
