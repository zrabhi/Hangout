import { colorsMap } from "@/utils/ClorsMap";
import { ColorVariants } from "@/utils/ColorVarianrts";
import React, { ElementType, memo } from "react";
import { StyleSheet, ViewProps } from "react-native";
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
  variant: ColorVariants;
  icon: ElementType;
  isBackground?: boolean;
  disabled?: boolean;
}

export const AnimatedIcon = memo(
  ({
    onPress,
    icon,
    variant,
    direction = undefined,
    isZoomed,
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
          style={[
            styles.iconContainer,
            rest.style,
            isBackground && {
              backgroundColor: colorsMap[variant],
            },
            animatedStyle,
          ]}
        >
          <Icon
            strokeWidth={2}
            fill="none"
            color={
              disabled
                ? "rgba(0,0,0,0.3)"
                : isBackground
                  ? "#FFFFFF"
                  : colorsMap[variant]
            }
          />
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
