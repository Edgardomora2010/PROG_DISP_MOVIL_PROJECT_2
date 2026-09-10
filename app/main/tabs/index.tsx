/* Importación de componentes de React Native */
import { Pressable, Text, View } from "react-native";

/* Importación de navegación */
import { router } from "expo-router";

/* Importación de estilos */
import { componentStyles } from "../../../styles/components";
import { layoutStyles } from "../../../styles/layout";

/* Componente de la pantalla de inicio */
export default function Home() {
  return (
    <View style={layoutStyles.container}>
      <Text style={componentStyles.title}>Recetario Medieval</Text>

      <Text style={componentStyles.subtitle}>
        Explora y descubre la cocina medieval
      </Text>

      {/* Ver recetas */}
      <Pressable
        style={componentStyles.libraryButton}
        onPress={() => router.push("/main/recipeBook")}
      >
        <Text style={componentStyles.libraryButtonText}>Ver recetas</Text>
      </Pressable>

      {/* Crear receta */}
      <Pressable
        style={componentStyles.libraryButton}
        onPress={() => router.push("/main/recipeBook/newRecipe")}
      >
        <Text style={componentStyles.libraryButtonText}>Crear receta</Text>
      </Pressable>

      {/* Lugares */}
      <Pressable style={componentStyles.libraryButton}>
        <Text style={componentStyles.libraryButtonText}>
          Lugares y contexto histórico
        </Text>
      </Pressable>
    </View>
  );
}
