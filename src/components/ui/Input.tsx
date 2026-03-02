import Colors from "@/utils/Colors";
import { Text, View, StyleSheet, TextInput } from "react-native";

interface InputProps {
  value: string | null;
  label: string;
  placeHolder?: string;
  error: string | undefined;
  onChange: (input: string) => void;
  isEditable?: boolean;
}
export const Input = ({
  value,
  label,
  onChange,
  error,
  placeHolder = "Enter your value",
  isEditable = true,
}: InputProps) => {
  console.log("erros is ", error);
  return (
    <View style={styles.container}>
      <View style={styles.labelConatiner}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        editable={isEditable}
        placeholder={placeHolder}
        value={value ?? ""}
        onChangeText={onChange}
        selectionColor={Colors.primary.orange[100]}
        placeholderTextColor={"#c2c2c2"}
        style={styles.input}
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
