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

type ButtonVariant = "primary" | "secondary" | "danger";

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
    fontFamily: "Baloo2-SemiBold",
  },
  primaryButton: {
    backgroundColor: Colors.primary.blue[100],
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
  
  dangerButton: {
    backgroundColor: Colors.danger,
  },
  dangerText: {
    color: Colors.white,
  },
  button: {
    borderRadius: 12,
    borderWidth: 1.5,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
});
