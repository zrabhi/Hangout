import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@/utils/Colors";
import { useFocusEffect } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import React, { memo, ReactNode, useCallback } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  color: string;
  onPress: VoidFunction;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedCard = memo(
  ({ children, onPress, color }: AnimatedCardProps) => {
    const translationX = useSharedValue(-50);
    const borderAnim = useSharedValue(0);

    useFocusEffect(
      useCallback(() => {
        translationX.value = withSpring(0, { damping: 32, stiffness: 400 });
      }, []),
    );

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translationX.value }],
      borderLeftWidth: 5,
      borderLeftColor: interpolateColor(
        borderAnim.value,
        [0, 1],
        ["transparent", color],
      ),
    }));

    return (
      <>
        <AnimatedPressable
          onPress={onPress}
          onPressIn={() => {
            translationX.value = 15;
            borderAnim.value = 1;
          }}
          onPressOut={() => {
            translationX.value = 0;
            borderAnim.value = 0;
          }}
          style={[styles.card, animatedStyle]}
        >
          {children}
        </AnimatedPressable>

        <View style={styles.divider} />
      </>
    );
  },
);

const styles = StyleSheet.create({
  divider: {
    width: "70%",
    height: 1,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginTop: 8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background.card,
    padding: 12,
    marginTop: 14,
    paddingRight: 18,
    borderRadius: 0,
    borderLeftWidth: 30,
    borderLeftColor: "transparent",
  },
});
