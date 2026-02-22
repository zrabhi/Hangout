import { useEffect, useRef } from "react";
import { AppState, type AppStateStatus, ToastAndroid } from "react-native";

export const useAppBackgroundToast = () => {
  const lastBackgroundTime = useRef<number | null>(null);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "background") {
        lastBackgroundTime.current = Date.now();
      }

      if (nextState === "active" && lastBackgroundTime.current) {
        const date = new Date(lastBackgroundTime.current);

        const formattedTime = date.toLocaleString();

        ToastAndroid.show(
          `Last backgrounded at: ${formattedTime}`,
          ToastAndroid.CENTER,
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
