import { SendIcon } from "@/icons/Send";
import Colors from "@/utils/Colors";
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  View
} from "react-native";
import { AnimatedIcon } from "./AnimatedIcon";
import { useAppSettings } from "@/context/AppSettingsContext";

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
  const {headerColor} = useAppSettings();
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
        icon={SendIcon}
        style={[styles.sendButton, {backgroundColor:headerColor}]}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.background.header,
    borderTopWidth: 1,
    zIndex: 99,
    padding: 20,
    gap:10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
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
    borderWidth: 1.5,
    fontFamily: "Baloo2-Medium",
    fontSize: 16,
    borderRadius: 16,
    padding: 10,
    paddingLeft: 26,
  },
});
