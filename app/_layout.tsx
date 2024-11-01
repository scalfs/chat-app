import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  queryClient,
  QueryClientProvider,
} from "@/infrastructure/libs/tanstack-query";
import { AuthProvider } from "@/presentation/providers/auth-provider";
import { DependencyProvider } from "@/presentation/providers/dependency-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../global.css";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DarkTheme}>
        <AuthProvider>
          <DependencyProvider>
            <QueryClientProvider client={queryClient}>
              <RootLayoutNav />
            </QueryClientProvider>
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
