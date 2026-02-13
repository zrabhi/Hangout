/* eslint-disable */
import Colors from "@/utils/Colors";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends PressableProps {
  onClick: VoidFunction;
  title: string;
  style?: StyleProp<ViewStyle>;
  variant: ButtonVariant;
}

export const Button = ({
  onClick,
  title,
  variant,
  style,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, styles[`${variant}Button`], style]}
      onPress={onClick}
      {...rest}
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
    borderRadius: 12,
    borderWidth: 1.5,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.orange[100],
  },
});
