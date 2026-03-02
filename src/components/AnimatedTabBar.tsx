import { memo } from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Colors from "@/utils/Colors";
import { AddIcon } from "@/icons/Add";
import { router } from "expo-router";

export const AnimatedTabBar = memo(({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={tabBarStyle.container}>
      <View style={tabBarStyle.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Shared value for spring scale
          const scale = useSharedValue(isFocused ? 1.1 : 1);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: withSpring(scale.value, { damping: 12, stiffness: 150 }) }],
          }));

          return (
            <Animated.View key={route.key} style={animatedStyle}>
              <Pressable
                style={tabBarStyle.tab}
                onPress={() => {
                  navigation.navigate(route.name);
                  scale.value = 1.1;
                  setTimeout(() => {
                    scale.value = 1; // bounce back
                  }, 200);
                }}
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    size: 16,
                    color: isFocused ? Colors.black : Colors.white,
                  })}

                {isFocused && <Text style={tabBarStyle.tabName}>{route.name}</Text>}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      <Pressable
        style={tabBarStyle.addContactButton}
        onPress={() => router.navigate("/contact")}
      >
        <AddIcon fill={Colors.white} color={Colors.white} height={24} width={24} />
      </Pressable>
    </View>
  );
});

const tabBarStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    bottom: 30,
    gap: 12,
  },
  tabBarContainer: {
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.primary.orange[100],
    height: 60,
    width: "70%",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.black,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabName: {
    fontFamily: "Baloo2-Medium",
    fontSize: 12,
    marginLeft: 4,
    color: Colors.black,
  },
  addContactButton: {
    backgroundColor: Colors.primary.green[100],
    width: 48,
    height: 48,
    borderRadius: 32,
    borderWidth: 1.2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});