import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   checkAuthStatus()
  //     .then((status) => setIsAuthenticated(status))
  //     .finally(() => setIsLoading(false));
  // }, []);

  // if (isLoading) {
  //   return null; // Or a loading spinner
  // }

  // Redirect based on auth status
  // return <Redirect href={!isAuthenticated ? "/(chat-rooms)" : "/sign-in"} />;
  return <Redirect href="(chat-rooms)" />;
}
