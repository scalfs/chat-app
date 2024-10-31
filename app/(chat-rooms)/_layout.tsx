import { Stack } from "expo-router";

export default function AppLayout() {
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
