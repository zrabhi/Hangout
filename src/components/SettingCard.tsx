import { memo, ReactNode } from "react";
import { View } from "react-native";

interface SettingCardProps {
  children: ReactNode;
}
export const SettingCard = memo(({ children }: SettingCardProps) => {
  return <View></View>;
});
