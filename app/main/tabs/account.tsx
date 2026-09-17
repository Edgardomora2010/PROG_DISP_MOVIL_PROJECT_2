/* Importaciones de React Native */
import { ImageBackground, Text, View } from "react-native";
/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";
/* Importación de estilos */
import { componentStyles } from "../../../styles/components";

/* PANTALLA DE CUENTA DE USUARIO */

/* Componente principal de la cuenta */
export default function Account() {
  return (
    <ImageBackground
      source={require("../../../assets/images/wood_background.png")}
      style={componentStyles.recipeBackground}
      resizeMode="cover"
    >
      <View style={componentStyles.recipeDetailsHeader}>
        <Ionicons name="person" size={50} color="#f4f3f0" />

        <Text style={componentStyles.recipeDetailsTitle}>Cuenta</Text>
      </View>

      <View style={componentStyles.recipeDetailsCard}>
        <Text style={componentStyles.recipeSectionTitle}>
          Futuramente (versión 2.0)
        </Text>

        <Text style={componentStyles.recipeDetailsText}>
          En esta sección se podrán administrar los datos y funciones
          relacionadas con la cuenta del usuario.
        </Text>

        <Text style={componentStyles.bulletText}>👤 Crear una cuenta</Text>
        <Text style={componentStyles.bulletText}>
          🔐 Iniciar sesión (autenticación encriptada)
        </Text>
        <Text style={componentStyles.bulletText}>
          📝 Editar información del perfil
        </Text>
        <Text style={componentStyles.bulletText}>
          ❤️ Compartición completa de recetas favoritas
        </Text>
        <Text style={componentStyles.bulletText}>
          📖 Administración más compleja de mis recetas
        </Text>
      </View>
    </ImageBackground>
  );
}
