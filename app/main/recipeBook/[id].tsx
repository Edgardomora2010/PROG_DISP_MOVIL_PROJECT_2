import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RecipeBookDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Recipe Book: {id}</Text>
    </View>
  );
}
