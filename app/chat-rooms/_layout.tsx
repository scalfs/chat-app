import { config } from "@/presentation/components/ui/gluestack-ui-provider/config";
import { useProtectedRoute } from "@/presentation/hooks/useProtectedRoute";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function AppLayout() {
  useProtectedRoute();

  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerBlurEffect: "dark",
        headerTransparent: Platform.OS === "ios",
        headerStyle: Platform.select({
          android: { backgroundColor: config.light.info },
        }),
      }}
    />
  );
}
