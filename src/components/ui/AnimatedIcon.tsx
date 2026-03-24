import React, { type ElementType, memo, type ReactNode } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type RotationDirection = "left" | "right";

interface AnimatedIconProps extends ViewProps {
  onPress?: VoidFunction;
  onPressIn?: VoidFunction; // optional
  onPressOut?: VoidFunction; // optional
  isZoomed?: boolean;
  direction?: RotationDirection;
  icon?: ElementType;
  chidlren?: ReactNode;
  isBackground?: boolean;
  disabled?: boolean;
}

export const AnimatedIcon = memo(
  ({
    onPress,
    direction = undefined,
    chidlren = undefined,
    isZoomed,
    icon = undefined,
    onPressIn,
    onPressOut,
    isBackground = false,
    disabled = false,

    ...rest
  }: AnimatedIconProps) => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const Icon = icon;

    const tapGesture = Gesture.Tap()
      .enabled(!disabled)
      .onBegin(() => {
        scale.value = withTiming(1.2, { duration: 120 });
        if (onPressIn) scheduleOnRN(onPressIn);
      })
      .onEnd(() => {
        scale.value = withSequence(
          withTiming(1.15, { duration: 150 }),
          withSpring(isZoomed ? 1.15 : 1),
        );

        rotation !== undefined
          ? (rotation.value = withSequence(
              withTiming(0, { duration: 150 }),
              withTiming(90, { duration: 150 }),
              withSpring(0),
            ))
          : undefined;
      })
      .onFinalize(() => {
        if (disabled) return;
        scale.value = withSpring(isZoomed ? 1.15 : 1);
        if (onPressOut) scheduleOnRN(onPressOut);
        if (onPress) scheduleOnRN(onPress);
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        ...(direction !== undefined
          ? [
              {
                rotate: `${
                  direction === "right" ? rotation.value : -rotation.value
                }deg`,
              },
            ]
          : []),
        { scale: scale.value },
      ],
      opacity: disabled ? 0.4 : 1,
    }));

    return (
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          style={[styles.iconContainer, rest.style, animatedStyle]}
        >
          {Icon ? <Icon strokeWidth={2} fill="none" />: chidlren}
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
