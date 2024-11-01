import { useProtectedRoute } from "@/src/hooks/useProtectedRoute";
import { Stack } from "expo-router";

export default function AppLayout() {
  useProtectedRoute();

  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerBlurEffect: "dark",
        headerTransparent: true,
      }}
    />
  );
}
