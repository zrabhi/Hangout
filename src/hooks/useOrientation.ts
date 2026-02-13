import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();

      setIsLandscape(
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      );
    };

    checkOrientation();

    const subscription =
      ScreenOrientation.addOrientationChangeListener((event) => {
        const orientation = event.orientationInfo.orientation;

        setIsLandscape(
          orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
            orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        );
      });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return {
    isLandscape,
  };
};
