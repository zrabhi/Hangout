import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";
import { CallIcon } from "@/icons/Call"; // outgoing call icon
import { memo } from "react";
import { type Calls } from "@/types/Calls";
import { formatTime } from "@/utils/Helpers";

interface CallCardProps {
  call: Calls; // only outgoing calls
  onPressCall:  (address: string, contactName: string, contactId: number) => Promise<void>
}

export const CallCard = memo(({ call, onPressCall }: CallCardProps) => {
  const fullName = call.contactName ?? call.address;
  const cdnRandomImage = `https://api.dicebear.com/9.x/toon-head/svg?seed=${fullName}`;

  return (
    <Pressable
      style={styles.button}
      onPress={() => onPressCall(call.address, fullName, call.contactId)}
    >
      {/* Avatar */}
      <Image
        source={{ uri: call.image ?? cdnRandomImage }}
        style={styles.contactImage}
      />

      {/* Contact info */}
      <View style={styles.contactSummary}>
        <Text style={styles.contactName} numberOfLines={1}>
          {fullName}
        </Text>
        <Text style={styles.time}>{formatTime(call.timestamp)}</Text>
      </View>

      {/* Outgoing call icon */}
      <View style={styles.callIcon}>
        <CallIcon strokeWidth={2} fill={Colors.primary.blue[100]} />
      </View>
    </Pressable>
  );
});

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

  contactName: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 14,
    color: Colors.black,
  },

  time: {
    fontFamily: "Baloo2-Medium",
    fontSize: 12,
    color: Colors.text.gray,
    marginTop: 2,
  },

  callIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});