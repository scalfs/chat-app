import { useAuth } from "@/presentation/providers/auth-provider";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useProtectedRoute = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  const [isNavigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation?.addListener("state", () =>
      setNavigationReady(true)
    );
    return function cleanup() {
      if (unsubscribe) unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    if (!isNavigationReady) return;
    if (!isAuthenticated) router.replace("/sign-in");
  }, [isAuthenticated, isNavigationReady]);
};
