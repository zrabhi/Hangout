import { useAppSettings } from "@/context/AppSettingsContext";
import { SettingIcon } from "@/icons/Menu";
import { SparkelsIcons } from "@/icons/SparkelsIcon";
import Colors from "@/utils/Colors";
import { type BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { type NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedIcon } from "./AnimatedIcon";
import { LeftArrownIcon } from "@/icons/LeftArrow";

interface ScreenHeaderProps {
  options: BottomTabHeaderProps | NativeStackHeaderProps;
  isTab?: boolean;
  children?: ReactNode;
  isSettingsShown?: boolean;
}

export const ScreenHeader = ({
  options,
  isTab = true,
  isSettingsShown = true,
  children,
}: ScreenHeaderProps) => {
  const { headerColor } = useAppSettings();
  const handleOnPressSetting = () => router.navigate("/settings");

  const handleOnPressBack = () => router.back();
  return (
    <>
      <View style={[styles.headerContainer, { backgroundColor: headerColor }]}>
        <View style={[styles.titleConatiner, !isTab && { gap: 16 }]}>
          {!isTab && (
            <AnimatedIcon icon={LeftArrownIcon} onPress={handleOnPressBack} />
          )}
          {children === undefined ? (
            <>
              <Text style={styles.title}>{options?.options.title}</Text>
              <SparkelsIcons
                height={20}
                width={20}
                fill={Colors.primary.orange[100]}
                strokeWidth={2.5}
                color={Colors.primary.orange[100]}
              />
            </>
          ) : (
            children
          )}
        </View>
        {isSettingsShown && (
          <AnimatedIcon
            direction="right"
            icon={SettingIcon}
            onPress={handleOnPressSetting}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleConatiner: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: Colors.primary.green[100],
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.black,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Baloo2-Bold",
    fontSize: 26,
    color: Colors.black,
  },
});
