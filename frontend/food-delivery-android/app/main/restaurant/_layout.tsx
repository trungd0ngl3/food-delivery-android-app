import { Stack } from "expo-router";

export default function RestaurantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="add-menu" />
      <Stack.Screen name="edit-menu" />
    </Stack>
  );
}
