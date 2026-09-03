import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { componentStyles } from "../../styles/components";
import { layoutStyles } from "../../styles/layout";

/* Pantalla de inicio de sesión */
export default function LoginScreen() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const login = () => {
    if (username === "admin" && password === "admin") {
      router.replace("/main/tabs");
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
        onChangeText={setUsername}
      />

      <TextInput
        style={componentStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={componentStyles.loginButton} onPress={login}>
        <Text style={componentStyles.loginButtonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}
