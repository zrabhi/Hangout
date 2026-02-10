import { memo } from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@utils/Colors";
import { AddIcon } from "@/icons/Add";

export const AnimatedTabBar = memo(
  ({ state, descriptors, navigation }: BottomTabBarProps) => {
    // TODO: Add animation to the active tab indicator Spring

    return (
      <View style={tabBarStyle.container}>
        <View style={tabBarStyle.tabBarContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            return (
              <Pressable
                key={route.key}
                style={[tabBarStyle.tab, isFocused && tabBarStyle.focusedTab]}
                onPress={() => navigation.navigate(route.name)}
              >
                {options.tabBarIcon &&
                  options.tabBarIcon?.({
                    focused: isFocused,
                    size: 16,
                    color: isFocused ? Colors.black : Colors.white,
                  })}

                {isFocused && (
                  <Text style={tabBarStyle.tabName}>{route.name}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
        <Pressable style={tabBarStyle.addContactButton}>
          <AddIcon
            fill={Colors.white}
            color={Colors.white}
            height={24}
            width={24}
          />
        </Pressable>
      </View>
    );
  },
);

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
  tabName: {
    fontFamily: "Baloo2-Medium",
    fontSize: 12,
    color: Colors.black,
  },
  focusedTab: {
    backgroundColor: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1.2,
  },
  activeTab: {
    position: "absolute",
    paddingVertical: 15,
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderWidth: 1,
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
});
