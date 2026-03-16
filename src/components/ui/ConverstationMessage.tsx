import { useAppSettings } from "@/context/AppSettingsContext";
import { DeleviryStateType } from "@/types/Message";
import { MessageType } from "@/types/MessageTYpe";
import Colors from "@/utils/Colors";
import { formatTime } from "@/utils/Helpers";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ConverstationMessageProps {
  type: MessageType;
  messageId: number;
  message: string;
  deleviryState: DeleviryStateType;
  senderName: string;
  onRetry: (messageId: number) => Promise<void>;
  time: number;
}

export const ConversationMessage = ({
  type,
  message,
  time,
  messageId,
  senderName,
  onRetry,
  deleviryState,
}: ConverstationMessageProps) => {
  const { t } = useAppSettings();
  const isSent = type === MessageType.SENT;

  const renderStatus = () => {
    if (!isSent) return null;

    if (deleviryState === DeleviryStateType.SENT) {
      return <Text style={styles.statusText}>{t("sent")}</Text>;
    }

    if (deleviryState === DeleviryStateType.PENDING) {
      return <Text style={styles.statusText}>{t("sending")}.</Text>;
    }

    if (deleviryState === DeleviryStateType.FAILED) {
      return (
        <TouchableOpacity onPress={() => onRetry(messageId)}>
          <Text style={styles.retryText}>{t("messageFailedRetry")}</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View
      style={[styles.messageContainer, isSent ? styles.sent : styles.received]}
    >
      {!isSent && <Text style={styles.senderText}>{senderName}</Text>}
      <View
        style={[
          styles.textBubble,
          isSent ? styles.senderBubble : styles.recieverBubble,
        ]}
      >
        <Text selectable style={[isSent && { color: Colors.white }, styles.messageText]}>
          {message}
        </Text>
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
  senderBubble: {
    backgroundColor: Colors.primary.blue[100],
    borderColor: `${Colors.primary.blue[100]}30`,
    elevation: 3,
    borderWidth: 1,
    borderBottomLeftRadius: 14,
  },
  recieverBubble: {
    backgroundColor: Colors.white,
    elevation: 3,
    borderColor: "rgba(0,0,0,0.08)",
    borderWidth: 1,
    borderBottomRightRadius: 14,
    // color:Colors.black
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Baloo2-Bold",
    color: Colors.text.gray,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  senderText: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 12,
    color: "gray",
    marginBottom: 2,
  },
  timeText: {
    fontFamily: "Baloo2-Bold",
    fontSize: 12,
    color: Colors.text.gray,
    marginTop: 2,
    alignSelf: "flex-end",
  },
  messageText: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 14,
  },
  sent: { alignSelf: "flex-end" },
  received: { alignSelf: "flex-start" },
});
