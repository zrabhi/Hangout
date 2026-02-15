import { SendIcon } from "@/icons/Send";
import Colors from "@/utils/Colors";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ConversationInputProps {
  input: string | null;
  onInputChange: (text: string) => void;
  onPress: () => Promise<void>;
  editibal?: boolean;
}

export const ConversationInput = ({
  input,
  onPress,
  onInputChange,
}: ConversationInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={input ?? ""}
        onChangeText={onInputChange}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onPress}>
        <SendIcon fill={"none"} color={Colors.white}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin:10,
    zIndex:99,
    flexDirection: "row",
    padding: 8, 
    alignItems:'center',
    //position:'absolute',
    //bottom:20,
  },

  sendButton: {
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:Colors.primary.green[100],
    borderRadius:20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    fontFamily:'Baloo2-Medium',
    borderRadius: 12,
    padding:14,
    marginRight: 8,
  },
});
