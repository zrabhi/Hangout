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
  ({ children, onPress }: AnimatedCardProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <>
        <AnimatedPressable
          onPress={onPress}
          onPressIn={() => {
            scale.value = withSpring(1.03, { damping: 12, stiffness: 150 });
          }}
          onPressOut={() => {
            scale.value = withSpring(1, { damping: 12, stiffness: 150 });
          }}
          style={[styles.card, animatedStyle]}
        >
          {children}
        </AnimatedPressable>

      </>
    );
  }
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
    borderRadius: 16,
    borderWidth:1,
  },
});
