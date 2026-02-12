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


import { DataBaseProvider } from "@/context/DatabaseContext";
import { deleteDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { LanguageProvider } from "@/context/TranlsationContext";

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

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState: any) => {
  //     if (nextAppState === 'background') {
  //       setBackgroundTime(new Date());
  //     } else if (nextAppState === 'active' && backgroundTime) {
  //       ToastAndroid.show({
  //         type: 'success',
  //         position: 'bottom',
  //         text1: t('menu.backgrounded'),
  //         text2: `${backgroundTime.toLocaleTimeString()}`,
  //         visibilityTime: 2000,
  //         autoHide: true,
  //         topOffset: 30,
  //         bottomOffset: 40,
  //       });
  //     }
  //   };

  //   const subscription = AppState.addEventListener(
  //     'change',
  //     handleAppStateChange,
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [backgroundTime]);

  // Drop a table

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider
        databaseName="hangouts.db"
        onError={async () => await deleteDatabaseAsync("hangouts.db")}
      >
        <DataBaseProvider>
          <LanguageProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="contact" />
            </Stack>
          </LanguageProvider>
        </DataBaseProvider>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
