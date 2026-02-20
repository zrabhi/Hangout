import { type DeleviryStateType } from "@/types/Message";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface LastMessageCardProps {
  time: string;
  state?: DeleviryStateType;
  address: string;
  onPress: VoidFunction;
  message: string;
}

export const LastMessageCard = memo(
  ({ message, address, onPress }: LastMessageCardProps) => {
    return (
      <Pressable onPress={onPress}>
        <Text>{address}</Text>
        <Text>{message}</Text>
        <View />
      </Pressable>
    );
  },
);

// const styles = StyleSheet.create({
//   button: {},
//   address: {},
//   message: {},
// });
