import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";
import { memo } from "react";
import { DeleviryStateType, type Inbox } from "@/types/Message";
import { formatTime } from "@/utils/Helpers";

interface LastMessageCardProps
  extends PressableProps,
    Omit<Inbox, "contactId" | "type"> {
  address: string;
  onPress: VoidFunction;
}

export const LastMessageCard = memo(
  ({
    body,
    address,
    onPress,
    firstName,
    lastName,
    date,
    image,
    deleviryState,
  }: LastMessageCardProps) => {
    const cdnRandomImage = `https://api.dicebear.com/9.x/toon-head/svg?seed=${firstName}`;
    const fullName = `${firstName} ${lastName}`;

    const getStatusColor = (state?: DeleviryStateType) => {
      switch (state) {
        case DeleviryStateType.SENT:
          return Colors.primary.blue[100];
        case DeleviryStateType.DELIVERED:
          return Colors.primary.green[100];
        case DeleviryStateType.FAILED:
          return Colors.primary.red[100];
        default:
          return Colors.text.gray;
      }
    };

    return (
      <Pressable style={styles.button} onPress={onPress}>
        {/* Avatar */}
        <Image
          source={{ uri: image ?? cdnRandomImage }}
          style={styles.contactImage}
        />

        {/* Main Info */}
        <View style={styles.contactSummary}>
          <View style={styles.topRow}>
            <Text style={styles.contactName} numberOfLines={1}>
              {fullName}
            </Text>
            <Text style={styles.time}>{formatTime(date)}</Text>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.message} numberOfLines={1}>
              {body}
            </Text>
            {/* Delivery Status Indicator */}
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(deleviryState) },
              ]}
            />
          </View>
        </View>
      </Pressable>
    );
  }
);


const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 15,
    borderWidth: 1.3,
    borderRadius: 15,
    backgroundColor: Colors.background.card,
  },

  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
  },

  contactSummary: {
    flex: 1,
    justifyContent: "center",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  contactName: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 14,
    color: Colors.black,
    flex: 1,
    marginRight: 8,
  },

  time: {
    fontFamily: "Baloo2-Medium",
    fontSize: 12,
    color: Colors.text.gray,
  },

  message: {
    fontFamily: "Baloo2-Medium",
    fontSize: 13,
    color: Colors.text.gray,
    flex: 1,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});