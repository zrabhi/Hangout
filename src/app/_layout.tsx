import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@hooks/use-color-scheme";

import { AppSettingsProvider } from "@/context/AppSettingsContext";
import { DataBaseProvider } from "@/context/DatabaseContext";
import { SQLiteProvider } from "expo-sqlite";
import { useAppBackgroundToast } from "@/hooks/UseLastBackground";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

  useAppBackgroundToast();
  // r
  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider
        databaseName="hangouts.db"
        // onError={async () => await deleteDatabaseAsync("hangouts.db")}
      >
        <DataBaseProvider>
          <AppSettingsProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  orientation: "all",
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="contact" />
              </Stack>
            </GestureHandlerRootView>
          </AppSettingsProvider>
        </DataBaseProvider>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
