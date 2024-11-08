import {
  queryClient,
  QueryClientProvider,
} from "@/infrastructure/libs/tanstack-query";
import { GluestackUIProvider } from "@/presentation/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/presentation/providers/auth-provider";
import { DependencyProvider } from "@/presentation/providers/dependency-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function RootLayout({ children: RootNav }: PropsWithChildren) {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DarkTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <DependencyProvider>
              <QueryClientProvider client={queryClient}>
                {RootNav}
              </QueryClientProvider>
            </DependencyProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
