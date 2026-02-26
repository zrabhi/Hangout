import { SendIcon } from "@/icons/Send";
import Colors from "@/utils/Colors";
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  View
} from "react-native";
import { AnimatedIcon } from "./AnimatedIcon";

interface ConversationInputProps extends TextInputProps {
  input: string | null;
  onInputChange: (text: string) => void;
  onPress: () => Promise<void>;
}

export const ConversationInput = ({
  input,
  onPress,
  onInputChange,
  ...rest
}: ConversationInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        editable={input?.length !== 0}
        style={styles.input}
        value={input ?? ""}
        onChangeText={onInputChange}
        {...rest}
      />
      <AnimatedIcon
        isBackground
        disabled={input?.length === 0}
        variant="blue"
        icon={SendIcon}
        style={[styles.sendButton]}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.background.header,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    zIndex: 99,
    padding: 20,
    gap:10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    //position:'absolute',
    //bottom:20,
  },
  disbaledButton: {
    backgroundColor: Colors.background.disabledIcon,
  },
  sendButton: {
    backgroundColor: Colors.background.icon,
    padding: 10,
    borderRadius: 16,
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "rgba(2, 125, 186, 0.15)",
    fontFamily: "Baloo2-Medium",
    fontSize: 16,
    borderRadius: 26,
    padding: 10,
    paddingLeft: 26,
  },
});
