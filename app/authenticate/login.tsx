import { router } from "expo-router";
/* Importación de hooks y componentes de React y React Native */
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
/* Importación de estilos de componentes y layout */
import { componentStyles } from "../../styles/components";
import { layoutStyles } from "../../styles/layout";
/* Importación del hook para operaciones CRUD de usuarios */
import { useUsersCRUD } from "../../hooks/useUsersCRUD";

/* PANTALLA DE INICIO DE SESIÓN */

/* Componente de la pantalla de inicio de sesión */
export default function LoginScreen() {
  /* Estado local para los campos de usuario y contraseña */
  /* Se utilizan variables hardcodeadas para propósitos de prueba
  y que por tema de tiempo y enfoque académico los servicios de 
  conexión a bases de datos y api, se enfocaron en el tema de recetas
  y no en la autenticación real de usuarios y seguridad. Sin embargo
   se implementó una lectura de los usuarios registrados desde base
    de datos SQLite. */
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin1234");
  /* Hook para validar el usuario en la base de datos */
  const { validateUser } = useUsersCRUD();

  /* Función de inicio de sesión */
  const login = async () => {
    try {
      /* Valida que exista la combinación de usuario y contraseña */
      const validUser = await validateUser(username, password);

      /* Si el usuario es válido, redirige a la pantalla principal */
      if (validUser) {
        router.replace("/main/tabs");
      } else {
        Alert.alert("Inicio de sesión", "Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al validar el usuario:", error);

      Alert.alert("Error", "No se pudo validar el usuario.");
    }
  };

  return (
    <View style={layoutStyles.loginContainer}>
      <Image
        source={require("../../assets/images/user.png")}
        style={layoutStyles.libraryUser}
      />

      <Text style={componentStyles.title}>Inicio de Sesión</Text>

      <TextInput
        style={componentStyles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername} // usuario en placeholder a propósito
      />

      <TextInput
        style={componentStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword} // contraseña en placeholder a propósito
      />

      <Pressable style={componentStyles.loginButton} onPress={login}>
        <Text style={componentStyles.loginButtonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}
