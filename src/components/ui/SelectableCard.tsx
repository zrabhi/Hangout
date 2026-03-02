import { CheckIcon } from "@/icons/CheckIcon";
import Colors from "@/utils/Colors";
import React, { memo, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

interface LanguageCardProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

export const SelectableCard = memo(
  ({ label, selected = false, onPress }: LanguageCardProps) => {
    const scale = useSharedValue(1);
    const iconScale = useSharedValue(selected ? 1 : 0);
    const iconOpacity = useSharedValue(selected ? 1 : 0);
    useEffect(() => {
      if (selected) {
        iconScale.value = withSpring(1);
        iconOpacity.value = withTiming(1);
      } else {
        iconScale.value = withSpring(0);
        iconOpacity.value = withTiming(0);
      }
    }, [selected]);

    const animatedCardStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ scale: iconScale.value }],
      opacity: iconOpacity.value,
    }));

    return (
      <AnimatedPressable
        onPress={() => {
          if (onPress) onPress();
          scale.value = withSpring(1.03);
          setTimeout(() => {
            scale.value = withSpring(1);
          }, 150);
        }}
        style={[styles.card, animatedCardStyle]}
      >
        <Text style={styles.label}>{label}</Text>
        <AnimatedView style={[styles.iconContainer, animatedIconStyle]}>
          <CheckIcon
            strokeWidth={2.5}
            color={Colors.primary.green[100]}
          />
        </AnimatedView>
      </AnimatedPressable>
    );
  }
);

const styles = StyleSheet.create({
  card: {
      borderColor:"rgba(0,0,0,0.08)",
    width:'100%',
    paddingVertical:16,
    paddingHorizontal:10,
    borderBottomWidth: 2,
    backgroundColor: Colors.background.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontFamily: "Baloo2-SemiBold",
    color: Colors.black,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});