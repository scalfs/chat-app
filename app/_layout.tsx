import { RootLayout } from "@/presentation/layouts/root";
import { Stack } from "expo-router";
import "../global.css";

export { ErrorBoundary } from "expo-router";

export default function Layout() {
  return (
    <RootLayout>
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
        <Stack.Screen name="chat-rooms" options={{ headerShown: false }} />
      </Stack>
    </RootLayout>
  );
}
