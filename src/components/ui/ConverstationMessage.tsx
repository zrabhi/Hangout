import { DeleviryStateType } from "@/types/Message";
import { MessageType } from "@/types/MessageTYpe";
import { formatTime } from "@/utils/Helpers";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


interface ConverstationMessageProps {
  type: MessageType;
  message: string;
  deleviryState: DeleviryStateType,
  senderName: string;
  onRetry: () => Promise<void>
  time: string;
}

export const ConversationMessage = ({
  type,
  message,
  time,
  senderName,
  onRetry,
  deleviryState
}: ConverstationMessageProps) => {


  const isSent = type === MessageType.SENT;
  console.log("type", deleviryState, isSent)

  const renderStatus = () => {
    console.log(deleviryState)
    if (!isSent) return null;


    if (deleviryState === DeleviryStateType.SENT) {
      return <Text style={styles.statusText}>✓ Sent</Text>;
    }

    if (deleviryState === DeleviryStateType.FAILED) {
      return (
        <TouchableOpacity onPress={onRetry}>
          <Text style={styles.retryText}>Failed • Tap to retry</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

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
     <View style={styles.footerRow}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
        {renderStatus()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginHorizontal: 10,
  },
  statusText: {
  fontSize: 10,
  color: "gray",
},
footerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 6,
},
retryText: {
  fontSize: 10,
  color: "red",
  fontWeight: "600",
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
