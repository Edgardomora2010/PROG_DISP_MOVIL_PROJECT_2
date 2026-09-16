/* Importaciones de React */
import { useState } from "react";
/* Importaciones de React Native */
import {
    Alert,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";
/* Importación de navegación */
import { router } from "expo-router";
/* Importación de estilos */
import { componentStyles } from "../../../styles/components";
/* Importación del hook para operaciones CRUD de recetas */
import { useRecipeCRUD } from "@/hooks/useRecipeCRUD";

/* PANTALLA PARA CREAR UNA RECETA PROPIA */

/* Exportación del componente de creación de receta */
export default function NewRecipe() {
  /* Estado para almacenar el título de la receta */
  const [title, setTitle] = useState("");
  /* Estado temporal para escribir un ingrediente */
  const [ingredient, setIngredient] = useState("");
  /* Estado para almacenar la lista de ingredientes agregados */
  const [ingredients, setIngredients] = useState<string[]>([]);
  /* Estado para almacenar la preparación de la receta */
  const [preparation, setPreparation] = useState("");

  /* Obtiene las operaciones CRUD de recetas */
  const { addRecipe } = useRecipeCRUD();

  /* Agrega el ingrediente escrito a la lista de ingredientes */
  const addIngredient = () => {
    /* Evita agregar ingredientes vacíos */
    if (!ingredient.trim()) {
      return;
    }

    /* Agrega el ingrediente a la lista de ingredientes */
    setIngredients([...ingredients, ingredient.trim()]);
    /* Limpia el campo después de agregar el ingrediente */
    setIngredient("");
  };

  /* Limpia todos los campos de la receta */
  const clearRecipe = () => {
    setTitle("");
    setIngredient("");
    setIngredients([]);
    setPreparation("");
  };

  /* Guarda la receta en la base de datos (SQLite) */
  const saveInDB = async (
    title: string,
    ingredientsText: string,
    preparation: string,
  ) => {
    try {
      /* Guarda la receta mediante el hook de operaciones CRUD */
      await addRecipe(title, ingredientsText, preparation);

      return true;
    } catch (error) {
      console.error("Error al guardar la receta en la base de datos:", error);

      return false;
    }
  };

  /* Guarda receta en base de datos (SQLite) */
  const saveRecipe = async () => {
    /* Validación de datos */
    if (!title.trim() || ingredients.length === 0 || !preparation.trim()) {
      Alert.alert(
        "Datos incompletos",
        "Debe ingresar un título, al menos un ingrediente y la preparación.",
      );

      return;
    }

    /* Convierte el arreglo de ingredientes en un único texto
       separado mediante punto y coma */
    const ingredientsText = ingredients.join(";");

    /* Guarda la receta en SQLite mediante el CRUD de recetas */
    const saved = await saveInDB(
      title.trim(),
      ingredientsText,
      preparation.trim(),
    );

    /* Verifica que la receta se haya guardado correctamente */
    if (!saved) {
      Alert.alert("Error", "No se pudo guardar la receta.");

      return;
    }

    /* Limpia los campos después de guardar la receta */
    clearRecipe();

    Alert.alert("Receta guardada", "La receta fue almacenada correctamente.");
  };

  return (
    /* Fondo principal de madera */
    <ImageBackground
      source={require("../../../assets/images/wood_background.png")}
      style={componentStyles.recipeBackground}
      resizeMode="cover"
    >
      {/* Contenido desplazable del formulario */}
      <ScrollView
        contentContainerStyle={componentStyles.newRecipeContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título de la pantalla */}
        <Text style={componentStyles.recipeDetailsTitle}>Crear receta</Text>

        {/* Campo para el título de receta */}
        <View style={componentStyles.newRecipeCard}>
          <Text style={componentStyles.recipeSectionTitle}>Título receta</Text>

          <TextInput
            style={componentStyles.newRecipeInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Nombre de la receta"
            placeholderTextColor="#8B6F5A"
          />
        </View>

        {/* Sección de ingredientes */}
        <View style={componentStyles.newRecipeCard}>
          <Text style={componentStyles.recipeSectionTitle}>Ingredientes</Text>

          {/* Campo para escribir un ingrediente */}
          <View style={componentStyles.newRecipeIngredientRow}>
            <TextInput
              style={componentStyles.newRecipeIngredientInput}
              value={ingredient}
              onChangeText={setIngredient}
              placeholder="Ej: 500 g de harina"
              placeholderTextColor="#8B6F5A"
              onSubmitEditing={addIngredient}
            />

            {/* Botón para agregar ingrediente */}
            <Pressable
              style={componentStyles.newRecipeAddButton}
              onPress={addIngredient}
            >
              <Ionicons name="add-outline" size={25} color="#F4D06F" />
            </Pressable>
          </View>

          {/* Lista visual de ingredientes agregados */}
          <View style={componentStyles.newRecipeIngredientsBox}>
            {ingredients.length === 0 ? (
              <Text style={componentStyles.newRecipeEmptyText}>
                No se han agregado ingredientes.
              </Text>
            ) : (
              ingredients.map((item, index) => (
                <Text key={index} style={componentStyles.recipeIngredient}>
                  • {item}
                </Text>
              ))
            )}
          </View>
        </View>

        {/* Sección de preparación */}
        <View style={componentStyles.newRecipeCard}>
          <Text style={componentStyles.recipeSectionTitle}>Preparación</Text>

          <TextInput
            style={componentStyles.newRecipePreparationInput}
            value={preparation}
            onChangeText={setPreparation}
            placeholder="Escriba aquí la preparación de la receta..."
            placeholderTextColor="#8B6F5A"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Botón para limpiar el formulario */}
        <Pressable
          style={componentStyles.newRecipeClearButton}
          onPress={clearRecipe}
        >
          <Ionicons name="trash-outline" size={20} color="#6B4F3A" />

          <Text style={componentStyles.newRecipeClearButtonText}>
            Limpiar receta
          </Text>
        </Pressable>

        {/* Botón para guardar la receta */}
        <Pressable style={componentStyles.libraryButton} onPress={saveRecipe}>
          <Text style={componentStyles.libraryButtonText}>Guardar receta</Text>
        </Pressable>

        {/* Acciones de navegación */}
        <View style={componentStyles.recipeDetailsActions}>
          {/* Volver */}
          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={25} color="#6B4F3A" />

            <Text style={componentStyles.recipeDetailsActionText}>Volver</Text>
          </Pressable>

          {/* Inicio */}
          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={() => router.replace("/main/tabs")}
          >
            <Ionicons name="home-outline" size={25} color="#6B4F3A" />

            <Text style={componentStyles.recipeDetailsActionText}>Inicio</Text>
          </Pressable>

          {/* Mis recetas */}
          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={() =>
              router.push({
                pathname: "/main/recipeBook",
                params: {
                  context: "modern",
                },
              })
            }
          >
            <Ionicons name="book-outline" size={25} color="#6B4F3A" />

            <Text style={componentStyles.recipeDetailsActionText}>
              Mis recetas
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
