import { useAppSettings } from "@/context/AppSettingsContext";
import { LeftArrownIcon } from "@/icons/LeftArrow";
import Colors from "@/utils/Colors";
import { MenuIcon } from "@icons/Menu";
import { type BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { type NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { type ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MenuModal } from "./MenuModal";

interface ScreenHeaderProps {
  options: BottomTabHeaderProps | NativeStackHeaderProps;
  isTab?: boolean;
  children?: ReactNode;
}

export const ScreenHeader = ({
  options,
  isTab = true,
  children,
}: ScreenHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const { headerColor, isLandscape } = useAppSettings();

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: headerColor },
          isLandscape && { paddingTop: 40 },
        ]}
      >
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
        {children ? (
          children
        ) : (
          <Text style={styles.title}>{options.options.title}</Text>
        )}
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
    marginVertical: 26,
    paddingHorizontal: 18,
    borderBottomWidth: 1.5,
    paddingVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontFamily: "Baloo2-Bold",
    fontSize: 18,
  },
});
