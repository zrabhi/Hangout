import { NetworkIcon } from "@/icons/NetworkIcon";
import Colors from "@/utils/Colors";
import { memo, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface AnimatedLogoAppProps {
  size: "lg" | "sm";
}

export const AnimatedLogoApp = memo(({ size = "lg" }: AnimatedLogoAppProps) => {
  const scale = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 150 });

    pulse.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.3 * pulse.value }],
    opacity: 0.6 - 0.6 * pulse.value,
  }));

  const isSmall = size === "sm";
  const cardSize = isSmall ? 48 : 128;
  const numberSize = isSmall ? 12 : 48;
  const networkFontSize = isSmall ? 6 : 18;
  const pulseBorderRadius = isSmall ? 12 : 24;

  return (
    <Animated.View
      style={[
        styles.card,
        !isSmall && cardStyle,
        {
          width: cardSize,
          height: cardSize,
          borderRadius: pulseBorderRadius,
        },
      ]}
    >
      <Text style={[styles.cardNumber, { fontSize: numberSize }]}>42</Text>

      <View style={[styles.networkRow, { gap: isSmall ? 2 : 4 }]}>
        <NetworkIcon
          strokeWidth={isSmall ? 1.5 : 2.5}
          color={Colors.white}
          width={isSmall ? 10 : 24}
          height={isSmall ? 10 : 24}
        />
        <Text style={[styles.networkText, { fontSize: networkFontSize }]}>
          NETWORK
        </Text>
      </View>

      <Animated.View
        style={[
          styles.pulseRing,
          pulseStyle,
          {
            width: cardSize,
            height: cardSize,
            borderRadius: pulseBorderRadius,
          },
        ]}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary.orange[100],
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  cardNumber: {
    fontFamily: "Baloo2-ExtraBold",
    color: Colors.white,
  },
  networkRow: {
    flexDirection: "row",
  },
  networkText: {
    fontFamily: "Baloo2-Bold",
    color: Colors.white,
  },
  pulseRing: {
    position: "absolute",
    borderWidth: 2,
    borderColor: Colors.primary.orange[100],
  },
});
