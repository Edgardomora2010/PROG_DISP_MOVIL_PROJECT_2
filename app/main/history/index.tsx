/* Importaciones de React */
import { useEffect, useState } from "react";
/* Importaciones de React Native */
import { FlatList, Image, ImageBackground, Text, View } from "react-native";
/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";
/* Importación del servicio de lugares */
import { placeService } from "../../../services/placeServices";
/* Importación de estilos */
import { componentStyles } from "../../../styles/components";
/* Importación del tipo Place */
import { Place } from "../../../lib/api/types";

/* Componente principal del catálogo histórico */
export default function History() {
  /* Estado local para almacenar los lugares obtenidos de la API */
  const [places, setPlaces] = useState<Place[]>([]);

  /* Carga los lugares al montar el componente */
  useEffect(() => {
    const loadPlaces = async () => {
      const data = await placeService.getAllDataPlaces();
      setPlaces(data);
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
        <FlatList
          data={places}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={componentStyles.historyList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={componentStyles.historyItem}>
              {/* Imagen del lugar */}
              {item.image_place_url ? (
                <Image
                  source={{ uri: item.image_place_url }}
                  style={componentStyles.historyImage}
                />
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
      </View>
    </ImageBackground>
  );
}
