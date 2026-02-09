import { MenuIcon } from "@icons/Menu";
import { type BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MenuModal } from "./MenuModal";
import Colors from "@/utils/Colors";

export const ScreenHeader = ({ options }: BottomTabHeaderProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{options?.title}</Text>
        <Pressable style={styles.menuButton} onPress={() => setVisible(true)}>
          <MenuIcon color={Colors.white} height={18} width={18} />
        </Pressable>
      </View>
      <MenuModal isMenuVisible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 12,
    borderRadius: 12,
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
    fontSize: 18,
    fontWeight: "600",
  },
});
