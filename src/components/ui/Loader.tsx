import Colors from "@/utils/Colors";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from "react-native-reanimated";

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
  const dots = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];

  useEffect(() => {
    dots.forEach((dot, i) => {
      dot.value = withDelay(
        i * 150, 
        withRepeat(
          withTiming(-12, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          -1, 
          true, 
        ),
      );
    });
  }, []);


  const textOpacity = useSharedValue(0.5);
  useEffect(() => {
    textOpacity.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.row, { gap: 8 }]}>
        {dots.map((_, i) => {
          const dotStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: dots[i].value }],
          }));
          return (
            <Animated.View
              key={i}
              style={[
                {
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 1.5,
                  backgroundColor: Colors.primary.orange[100],
                },
                dotStyle,
              ]}
            />
          );
        })}
      </View>
      {text && (
        <Animated.Text style={[styles.text, animatedTextStyle]}>
          {text}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: "Baloo2-SemiBold",
    color: Colors.text.gray,
  },
});
