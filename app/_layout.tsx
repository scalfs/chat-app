import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DarkTheme}>
        <StatusBar style="auto" />
        <RootLayoutNav />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

function RootLayoutNav() {
  return <Stack />;
}
