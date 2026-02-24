import { colorsMap } from "@/utils/ClorsMap";
import React, { ElementType, memo, ReactElement } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type IconColorVariant = "blue" | "orange";

interface AnimatedIconProps extends ViewProps {
  onPress: VoidFunction;
  variant:IconColorVariant,
  icon: ElementType;
}

export const AnimatedIcon = memo(
  ({ onPress, icon,variant, ...rest }: AnimatedIconProps) => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const Icon = icon;

    const tabGesture = Gesture.Tap()
      .onBegin(() => {
        scale.value = withTiming(0.9, { duration: 10000 });
      })
      .onEnd(() => {
        rotation.value = withSequence(
          withTiming(90, { duration: 150 }),
          withSpring(0),
        );
      })
      .onFinalize(() => {
        scale.value = withTiming(1, { duration: 10000 });
       // onPress(); // there is a problem hereneed invistigations
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
      };
    });

    return (
      <GestureDetector gesture={tabGesture}>
        <Animated.View
          style={[rest.style, styles.iconContainer, animatedStyle]}
        >
          <Icon strokeWidth={2}  color={colorsMap[variant]}/>
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
