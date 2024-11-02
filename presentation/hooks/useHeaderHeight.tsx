import { useHeaderHeight as useHeaderHeightRN } from "@react-navigation/elements";
import { Platform } from "react-native";

export function useHeaderHeight() {
  const headerHeight = useHeaderHeightRN();
  return Platform.OS === "ios" ? headerHeight : 0;
}
