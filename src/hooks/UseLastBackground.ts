import { useAppSettings } from "@/context/AppSettingsContext";
import { useEffect, useRef } from "react";
import { AppState, type AppStateStatus, ToastAndroid } from "react-native";

export const useAppBackgroundToast = () => {
  const lastBackgroundTime = useRef<number | null>(null);


  const {t} = useAppSettings()
  
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "background") {
        lastBackgroundTime.current = Date.now();
      }

      if (nextState === "active" && lastBackgroundTime.current) {
        const date = new Date(lastBackgroundTime.current);

        const formattedTime = date.toLocaleString();
      ToastAndroid.showWithGravityAndOffset(
        `${t('lastBackgroundedAt')} ${formattedTime}`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        ToastAndroid.BOTTOM,
        0,
      );

        lastBackgroundTime.current = null;
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, []);
};
