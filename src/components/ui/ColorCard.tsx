import React, { memo, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Colors from "@/utils/Colors";
import { CheckIcon } from "@/icons/CheckIcon";

interface ColorCardProps {
  color: string;
  name: string;
  selected?: boolean;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);
export const ColorCard = memo(
  ({ color, name, selected = false, onPress }: ColorCardProps) => {
    const scale = useSharedValue(selected ? 1.05 : 1);

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

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      borderColor: selected ? Colors.primary.blue[100] : Colors.black,
      borderWidth: selected ? 2.5 : 1
    }));

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ scale: iconScale.value }],
      opacity: iconOpacity.value,
    }));
    return (
      <AnimatedPressable
        onPress={() => {
          if (onPress) onPress();
          scale.value = withSpring(1.05, { damping: 12 });
          setTimeout(() => {
            scale.value = withSpring(1);
          }, 200);
        }}
        style={[styles.card, animatedStyle]}
      >
        <View style={[styles.colorBox, { backgroundColor: color }]} />
        <Text style={styles.colorName}>{name}</Text>
        {selected && (
          <AnimatedView style={[styles.selectedIcon, animatedIconStyle]}>
            <CheckIcon strokeWidth={2.5} color="#fff" />
          </AnimatedView>
        )}
      </AnimatedPressable>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 8,
    borderWidth: 1,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
  },
  colorName: {
    fontSize: 14,
    fontFamily: "Baloo2-Medium",
    color: Colors.black,
    textAlign: "center",
  },
  selectedIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: Colors.primary.blue[100],
    padding: 4,
    borderRadius: 12,
    zIndex: 2,
  },
});
