import { formatTime } from "@/utils/Helpers";
import { View, Text, StyleSheet } from "react-native";

enum MessageType {
  SENT = "2",
  RECIEVED = "1",
}
interface ConverstationMessageProps {
  type: MessageType;
  message: string;
  senderName: string;
  time: string;
}

export const ConversationMessage = ({
  type,
  message,
  time,
  senderName,
}: ConverstationMessageProps) => {
  return (
    <View
      style={[
        styles.messageContainer,
        type === MessageType.SENT ? styles.sent : styles.received,
      ]}
    >
      <Text style={styles.senderText}>
        {type === MessageType.SENT ? "You" : senderName}
      </Text>
      <View style={styles.textBubble}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginHorizontal: 10,
  },
  textBubble: {
    backgroundColor: "#edf1f7",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
  },
  senderText: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 12,
    color: "gray",
    marginBottom: 2,
  },
  timeText: {
    fontFamily: "Baloo2-Medium",
    fontSize: 10,
    color: "gray",
    marginTop: 2,
    alignSelf: "flex-end",
  },
  messageText: {
    fontFamily: "Baloo2-Medium",
    fontSize: 14,
  },
  sent: { alignSelf: "flex-end" },
  received: { alignSelf: "flex-start" },
});
