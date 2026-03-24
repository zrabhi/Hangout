import Colors from "@/utils/Colors";
import { Text, View, StyleSheet, TextInput, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  value: string | undefined;
  label: string;
  placeHolder?: string;
  error?: string | undefined;
  onChangeText: (input: string) => void;
  isEditable?: boolean;
}
export const Input = ({
  value,
  label,
  onChangeText,
  error,
  placeHolder = "Enter your value",
  isEditable = true,
  ...rest
}: InputProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.labelConatiner}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        editable={isEditable}
        placeholder={placeHolder}
        value={value ?? ""}
        onChangeText={onChangeText}
        selectionColor={Colors.primary.orange[100]}
        placeholderTextColor={"#c2c2c2"}
        style={styles.input}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  labelConatiner: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: -10 }],
    left: 14,
    zIndex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 4,
  },
  errorText: {
    fontFamily: "Baloo2-Medium",
    fontSize: 13,
    paddingLeft: 3,
    color: Colors.primary.red[100],
  },
  label: {
    fontSize: 13,
    fontFamily: "Baloo2-Medium",
  },
  container: {
    marginTop:30,
    width: "90%",
    gap: 4,
  },
  input: {
    borderWidth: 1.2,
    borderColor: Colors.black,
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    fontFamily: "Baloo2-Medium",
    fontSize: 12,
    color: Colors.black,
  },
});
