import React, { memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Colors from "@/utils/Colors";
import { CallIcon } from "@/icons/Call";

interface ColorCardProps {
  color: string;
  name: string;
  selected?: boolean;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ColorCard = memo(
  ({ color, name, selected = false, onPress }: ColorCardProps) => {
    const scale = useSharedValue(selected ? 1.05 : 1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      borderColor: selected ? Colors.primary.blue[100] : "rgba(0,0,0,0.08)",
      borderWidth: 2.5,
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
        {/* {selected && (
          <View style={styles.selectedIcon}>
            <CallIcon strokeWidth={2.5} color="#fff" />
          </View>
        )} */}
        <View style={[styles.colorBox, { backgroundColor: color }]} />
        <Text style={styles.colorName}>{name}</Text>
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
    elevation: 100,
  },
  colorBox: {
    width: 50,
    height: 50,
    elevation:10,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.08)',
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
    top: 6,
    left: 6,
    backgroundColor: Colors.primary.blue[100],
    padding: 4,
    borderRadius: 12,
    zIndex: 2,
  },
});
