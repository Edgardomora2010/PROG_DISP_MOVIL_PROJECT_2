/* Importación de componentes de React Native */
import { Image, Pressable, Text, View } from "react-native";
/* Importación de navegación */
import { router } from "expo-router";
/* Importación de estilos */
import { componentStyles } from "../../../styles/components";
/* Importación de estilos de layout */
import { layoutStyles } from "../../../styles/layout";

/* PANTALLA DE INICIO (HOME) */

/* Componente de la pantalla de inicio */
export default function Home() {
  return (
    <View style={layoutStyles.container}>
      <Text style={componentStyles.title}>Recetario Medieval</Text>

      <Text style={componentStyles.subtitle}>
        Explora y descubre la cocina medieval
      </Text>

      {/* VER RECETAS MEDIEVALES - (API) */}
      <Pressable
        style={componentStyles.libraryButton}
        onPress={() =>
          router.push({
            pathname: "/main/recipeBook",
            params: {
              context: "medieval",
            },
          })
        }
      >
        <Text style={componentStyles.libraryButtonText}>Ver recetas</Text>
      </Pressable>

      {/* AGREGAR RECETA PROPIA - (SQLITE) */}
      <Pressable
        style={componentStyles.libraryButton}
        onPress={() => router.push("/main/recipeBook/newRecipe")}
      >
        <Text style={componentStyles.libraryButtonText}>
          Agregar receta propia
        </Text>
      </Pressable>

      {/* VER MIS RECETAS PROPIAS - (SQLITE) */}
      <Pressable
        style={componentStyles.libraryButton}
        onPress={() =>
          router.push({
            pathname: "/main/recipeBook",
            params: {
              context: "modern",
            },
          })
        }
      >
        <Text style={componentStyles.libraryButtonText}>Ver mis recetas</Text>
      </Pressable>

      {/* VER HISTORIA Y LUGARES - (API) */}
      <Pressable
        style={componentStyles.libraryButton}
        onPress={() => router.push("/main/history")}
      >
        <Text style={componentStyles.libraryButtonText}>
          Lugares y contexto histórico
        </Text>
      </Pressable>

      {/* Imagen decorativa de ingredientes */}
      <View style={componentStyles.homeIngredientsContainer}>
        <Image
          source={require("../../../assets/images/ingredients.png")}
          style={componentStyles.homeIngredientsImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
