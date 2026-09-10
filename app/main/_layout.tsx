/* Importación del componente Drawer de Expo Router */
import { Drawer } from "expo-router/drawer";

/* Importación de iconos */
import { Ionicons } from "@expo/vector-icons";

/* Importación de estilos */
import { componentStyles } from "../../styles/components";

/* Componente de diseño de la aplicación */
export default function MainLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitle: "Recetario Medieval",

        /* Estilo del menú lateral */
        drawerStyle: componentStyles.drawerStyle,

        /* Estilo del texto de las opciones */
        drawerLabelStyle: componentStyles.drawerLabelStyle,

        /* Espacio entre las opciones */
        drawerItemStyle: componentStyles.drawerItemStyle,

        /* Color de la opción seleccionada */
        drawerActiveTintColor: "#F4D06F",
        drawerActiveBackgroundColor: "#6B4F3A",
      }}
    >
      {/* Inicio - contiene las pestañas */}
      <Drawer.Screen
        name="tabs"
        options={{
          title: "Inicio",
          drawerLabel: "Inicio",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Recetas */}
      <Drawer.Screen
        name="recipeBook"
        options={{
          title: "Recetas",
          drawerLabel: "Recetas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Acerca de */}
      <Drawer.Screen
        name="about"
        options={{
          title: "Acerca de",
          drawerLabel: "Acerca de",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Cerrar sesión */}
      <Drawer.Screen
        name="logout"
        options={{
          title: "Cerrar sesión",
          drawerLabel: "Cerrar sesión",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
