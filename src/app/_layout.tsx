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
import { LoadingIndicator } from "@/components/LoadingSplashScreen";
import { type ReactNode, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useIncomingSms } from "@/hooks/useIncomingSms";

export const unstable_settings = {
  anchor: "(tabs)",
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    "Baloo2-Regular": require("@assets/font/Baloo2-Regular.ttf"),
    "Baloo2-Medium": require("@assets/font/Baloo2-Medium.ttf"),
    "Baloo2-SemiBold": require("@assets/font/Baloo2-SemiBold.ttf"),
    "Baloo2-Bold": require("@assets/font/Baloo2-Bold.ttf"),
    "Baloo2-ExtraBold": require("@assets/font/Baloo2-ExtraBold.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 5200);

      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (showSplash) return <LoadingIndicator />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="hangouts.db">
        <DataBaseProvider>
          <AppSettingsProvider>
            <GestureHandlerRootView style={styles.gestureContainer}>
              {children}
            </GestureHandlerRootView>
          </AppSettingsProvider>
        </DataBaseProvider>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export const AppLayout = () => {
  useAppBackgroundToast();
  useIncomingSms();
  return (
    <Stack
      screenOptions={{
        orientation: "all",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="contact" />
    </Stack>
  );
};
export default function App() {

  return (
    <AppProviders>
      <AppLayout />
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
});
