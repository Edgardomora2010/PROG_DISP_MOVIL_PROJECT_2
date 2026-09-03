import { Stack } from "expo-router";

export default function LibraryStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalle de receta",
        }}
      />
    </Stack>
  );
}
