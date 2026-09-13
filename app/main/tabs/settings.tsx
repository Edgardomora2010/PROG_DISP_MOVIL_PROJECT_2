/* Importaciones de React Native */
import { ImageBackground, Text, View } from "react-native";
/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";
/* Importación de estilos */
import { componentStyles } from "../../../styles/components";
/* Componente principal de configuración */
export default function Settings() {
  return (
    <ImageBackground
      source={require("../../../assets/images/wood_background.png")}
      style={componentStyles.recipeBackground}
      resizeMode="cover"
    >
      <View style={componentStyles.recipeDetailsHeader}>
        <Ionicons name="settings" size={50} color="#f4f3f0" />

        <Text style={componentStyles.recipeDetailsTitle}>Configuración</Text>
      </View>

      <View style={componentStyles.recipeDetailsCard}>
        <Text style={componentStyles.recipeSectionTitle}>
          Futuramente (versión 2.0)
        </Text>

        <Text style={componentStyles.recipeDetailsText}>
          En esta sección se podrán administrar diferentes opciones de
          configuración de la aplicación.
        </Text>

        <Text style={componentStyles.bulletText}>
          🔔 Notificaciones de nuevas recetas
        </Text>

        <Text style={componentStyles.bulletText}>
          🌙 Apariencia y tema de la aplicación
        </Text>

        <Text style={componentStyles.bulletText}>
          🌐 Idioma de la aplicación
        </Text>

        <Text style={componentStyles.bulletText}>
          📱 Preferencias generales
        </Text>
      </View>
    </ImageBackground>
  );
}
