import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/presentation/providers/auth-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import "../global.css";
import { DependencyProvider } from "@/presentation/providers/dependency-provider";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DarkTheme}>
        <AuthProvider>
          <DependencyProvider>
            <RootLayoutNav />
          </DependencyProvider>
        </AuthProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="chat-rooms" options={{ headerShown: false }} />
    </Stack>
  );
}
