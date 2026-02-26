import { colorsMap } from "@/utils/ClorsMap";
import { ColorVariants } from "@/utils/ColorVarianrts";
import { router } from "expo-router";
import React, { ElementType, memo, useEffect } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
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
  direction: RotationDirection;
  variant: ColorVariants;
  icon: ElementType;
  isBackground?: boolean;
}

export const RotatingIcon = memo(
  ({
    onPress,
    icon,
    variant,
    direction,
    isZoomed,
    onPressIn,
    onPressOut,

    isBackground = false, // 👈 default false
    ...rest
  }: AnimatedIconProps) => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const Icon = icon;

    const tapGesture = Gesture.Tap()
      .onBegin(() => {
        scale.value = withTiming(1.2, { duration: 120 });
        if (onPressIn) scheduleOnRN(onPressIn);
      })
      .onEnd(() => {
        scale.value = withSequence(
          withTiming(1.15, { duration: 150 }),
          withSpring(isZoomed ? 1.15 : 1),
        );

        rotation.value = withSequence(
          withTiming(0, { duration: 150 }),
          withTiming(90, { duration: 150 }),
          withSpring(0),
        );
      })
      .onFinalize(() => {
        scale.value = withSpring(isZoomed ? 1.15 : 1);
        if (onPressOut) scheduleOnRN(onPressOut); // enable parent
        if (onPress) scheduleOnRN(onPress);
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: `${direction === "right" ? rotation.value : -rotation.value}deg`,
        },
        { scale: scale.value },
      ],
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
            strokeWidth={isBackground ? 2.5 : 2}
            fill="none"
            color={isBackground ? "#FFFFFF" : colorsMap[variant]}
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
