/* Importación de los componentes necesarios de React Native */
import { Image, Text, View } from "react-native";
import { componentStyles } from "../../styles/components";
import { layoutStyles } from "../../styles/layout";

export default function About() {
  return (
    <View style={layoutStyles.container}>
      <Image
        source={require("../../assets/images/about.png")}
        style={layoutStyles.libraryImage}
      />

      <Text style={componentStyles.title}>Sobre Recetario Medieval</Text>

      <Text style={componentStyles.subtitle}>
        Una mirada a la cocina de la Edad Media
      </Text>

      <View style={componentStyles.bookCard}>
        <Text style={componentStyles.bookAuthor}>Recetario Medieval</Text>

        <Text style={componentStyles.bookInfo}>
          Esta aplicación reúne distintas recetas de origen o inspiración
          medieval, acompañadas de información sobre su historia, procedencia e
          ingredientes.
        </Text>

        <Text style={componentStyles.bookInfo}>
          Las recetas fueron recopiladas a partir de diferentes fuentes
          históricas y gastronómicas y organizadas para facilitar su exploración
          desde la aplicación.
        </Text>

        <Text style={componentStyles.bookInfo}>
          Además de consultar las recetas disponibles, la aplicación permite
          crear y guardar preparaciones propias.
        </Text>
      </View>
    </View>
  );
}
