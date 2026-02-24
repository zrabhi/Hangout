import { useAppSettings } from "@/context/AppSettingsContext";
import { SettingIcon } from "@/icons/Menu";
import Colors from "@/utils/Colors";
import { type BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { type NativeStackHeaderProps } from "@react-navigation/native-stack";
import { type ReactNode, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedIcon } from "./AnimatedIcon";

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
  // const [visible, setVisible] = useState(false);
  const { headerColor, isLandscape } = useAppSettings();

  return (
    <>
      <View style={[styles.headerContainer, { backgroundColor: headerColor }]}>
        <Text style={styles.title}>{options?.options.title}</Text>
        <AnimatedIcon
          variant="blue"
          style={styles.settingIconConatiner}
          icon={SettingIcon}
          onPress={() => {
            console.log("pressed");
          }}
        />
      </View>
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
  settingIconConatiner: {
    backgroundColor: Colors.background.icon,
    padding: 10,
    borderRadius: 16,
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.tabBar.border,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Baloo2-Bold",
    fontSize: 22,
    color: Colors.primary.blue[100],
  },
});
