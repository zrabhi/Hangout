import { MenuIcon } from "@icons/Menu";
import { type BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MenuModal } from "./MenuModal";
import Colors from "@/utils/Colors";
import { router } from "expo-router";
import { type NativeStackHeaderProps } from "@react-navigation/native-stack";
import { LeftArrownIcon } from "@/icons/LeftArrow";

interface ScreenHeaderProps {
  options: BottomTabHeaderProps | NativeStackHeaderProps;
  isTab?: boolean;
}

export const ScreenHeader = ({ options, isTab = true }: ScreenHeaderProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {!isTab && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              router.back();
            }}
          >
            <LeftArrownIcon
              color={Colors.white}
              strokeWidth={2}
              height={16}
              width={16}
            />
          </Pressable>
        )}
        <Text style={styles.title}>{options.options.title}</Text>
        <Pressable style={styles.menuButton} onPress={() => setVisible(true)}>
          <MenuIcon
            color={Colors.white}
            strokeWidth={2}
            height={16}
            width={16}
          />
        </Pressable>
      </View>
      <MenuModal isMenuVisible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: Colors.primary.green[100],
  },
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 18,
  },
});
