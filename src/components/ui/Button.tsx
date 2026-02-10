/* eslint-disable */
import Colors from "@/utils/Colors";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  onClick: VoidFunction;
  title: string;
  variant: ButtonVariant;
}

export const Button = ({ onClick, title, variant }: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, styles[`${variant}Button`]]}
      onPress={onClick}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Baloo2-Medium",
  },
  primaryButton: {
    backgroundColor: Colors.primary.orange[100],
  },
  secondaryButton: {
    backgroundColor: Colors.white,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.black,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    height: 42,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.orange[100],
  },
});
