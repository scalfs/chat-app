import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  queryClient,
  QueryClientProvider,
} from "@/infrastructure/libs/tanstack-query";
import { AuthProvider } from "@/presentation/providers/auth-provider";
import { DependencyProvider } from "@/presentation/providers/dependency-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import "../global.css";

export { ErrorBoundary } from "expo-router";

export function RootLayout({ children: RootNav }: PropsWithChildren) {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DarkTheme}>
        <AuthProvider>
          <DependencyProvider>
            <QueryClientProvider client={queryClient}>
              {RootNav}
            </QueryClientProvider>
          </DependencyProvider>
        </AuthProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
