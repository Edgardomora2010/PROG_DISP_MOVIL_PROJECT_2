/* Importaciones de React */
import { useEffect, useState } from "react";
/* Importaciones de React Native */
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";
/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";
/* Importación del servicio de lugares */
import { placeService } from "../../../services/placeServices";
/* Importación de estilos */
import { componentStyles } from "../../../styles/components";
/* Importación del tipo Place */
import { router } from "expo-router";
import { Place } from "../../../lib/api/types";

/* PANTALLA DE HISTORIA Y LUGARES */

/* Componente principal del catálogo histórico */
export default function History() {
  /* Estado local para almacenar los lugares obtenidos de la API */
  const [places, setPlaces] = useState<Place[]>([]);
  /* Estado para controlar la carga de lugares */
  const [loading, setLoading] = useState(false);
  /* Estado para controlar errores al cargar lugares */
  const [error, setError] = useState<string | null>(null);
  /* Estado para controlar la visibilidad de la imagen */
  const [imageVisible, setImageVisible] = useState(false);
  /* Estado para almacenar la imagen seleccionada */
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /* Carga los lugares al montar el componente */
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await placeService.getAllDataPlaces();
        setPlaces(data);
      } catch (error) {
        console.error("Error al cargar los lugares:", error);
        setError("Error al cargar los lugares");
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, []);

  return (
    /* Fondo de madera de la aplicación */
    <ImageBackground
      source={require("../../../assets/images/wood_background.png")}
      style={componentStyles.recipeBackground}
      resizeMode="cover"
    >
      {/* Encabezado y mapa medieval */}
      <View style={componentStyles.historyHeader}>
        <Text style={componentStyles.recipeDetailsTitle}>
          Historia y lugares
        </Text>

        {/* Mapa medieval */}
        <View style={componentStyles.historyMapPlaceholder}>
          <Image
            source={require("../../../assets/images/map.png")}
            style={componentStyles.historyMapPlaceholder}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Lista de lugares obtenidos desde la API */}
      <View style={componentStyles.historyListContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={places}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={componentStyles.historyList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={componentStyles.historyItem}>
                {/* Imagen del lugar */}
                {item.image_place_url ? (
                  <Pressable
                    onPress={() => {
                      setSelectedImage(item.image_place_url);
                      setImageVisible(true);
                    }}
                  >
                    {/* Muestra la imagen seleccionada ampliada */}
                    <Modal
                      visible={imageVisible}
                      transparent={true}
                      animationType="fade"
                      onRequestClose={() => setImageVisible(false)}
                    >
                      <Pressable
                        style={componentStyles.recipeImageModal}
                        onPress={() => setImageVisible(false)}
                      >
                        {selectedImage && (
                          <Image
                            source={{ uri: selectedImage }}
                            style={componentStyles.recipeImageModalImage}
                            resizeMode="contain"
                          />
                        )}
                      </Pressable>
                    </Modal>

                    <Image
                      source={{ uri: item.image_place_url }}
                      style={componentStyles.historyImage}
                    />
                  </Pressable>
                ) : (
                  <View style={componentStyles.historyImagePlaceholder}>
                    <Ionicons name="image-outline" size={45} color="#8B6F5A" />

                    <Text style={componentStyles.historyImageText}>
                      Imagen del lugar
                    </Text>
                  </View>
                )}

                {/* Nombre del lugar */}
                <Text style={componentStyles.historyTitle}>{item.name}</Text>

                {/* Descripción */}
                <Text style={componentStyles.historyDescription}>
                  {item.description}
                </Text>

                {/* Contexto histórico */}
                <Text style={componentStyles.historyContext}>
                  {item.historical_context}
                </Text>

                {/* Coordenadas */}
                <Text style={componentStyles.historyCoordinates}>
                  <Ionicons name="location-outline" size={14} color="#8B6F5A" />{" "}
                  Latitud: {item.latitude ?? "No disponible"}
                </Text>

                <Text style={componentStyles.historyCoordinates}>
                  Longitud: {item.longitude ?? "No disponible"}
                </Text>
              </View>
            )}
          />
        )}
        {/* Acciones de historia */}
        <View
          style={[
            componentStyles.recipeDetailsActions,
            componentStyles.historyActions,
          ]}
        >
          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={25} color="#6B4F3A" />

            <Text style={componentStyles.recipeDetailsActionText}>Volver</Text>
          </Pressable>

          <Pressable
            style={componentStyles.recipeDetailsAction}
            onPress={() =>
              router.push({
                pathname: "/main/recipeBook",
                params: {
                  context: "medieval",
                },
              })
            }
          >
            <Ionicons name="restaurant-outline" size={25} color="#6B4F3A" />

            <Text style={componentStyles.recipeDetailsActionText}>
              Ver recetas
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
