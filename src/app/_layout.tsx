import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Baloo2-Regular": require("@assets/font/Baloo2-Regular.ttf"),
    "Baloo2-Medium": require("@assets/font/Baloo2-Medium.ttf"),
    "Baloo2-SemiBold": require("@assets/font/Baloo2-SemiBold.ttf"),
    "Baloo2-Bold": require("@assets/font/Baloo2-Bold.ttf"),
    "Baloo2-ExtraBold": require("@assets/font/Baloo2-ExtraBold.ttf"),
  });

  // NOTE: just a tempo return.
  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
