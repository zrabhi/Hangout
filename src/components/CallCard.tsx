import { CallIcon } from "@/icons/Call"; // outgoing call icon
import { OutgoingCall } from "@/icons/OutgoingCall";
import { CallsSummary, type Calls } from "@/types/Calls";
import { avatarColors } from "@/utils/AvatarColors";
import Colors from "@/utils/Colors";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AnimatedCard } from "./ui/AnimatedCard";
import { AnimatedIcon } from "./ui/AnimatedIcon";
import { ContactAvatar } from "./ui/ContactAvatar";
import { formatTime } from "@/utils/Helpers";

interface CallCardProps {
  call: CallsSummary;
  onPressCall: (call: CallsSummary) => Promise<void>;
}

export const CallCard = memo(({ call, onPressCall }: CallCardProps) => {
  const contactName = call.firstName  + call.lastName
  const fullName = contactName ?? call.address;
  const colorIndex = call.contactId % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <AnimatedCard color={avatarColor} onPress={() => onPressCall(call)}>
      <View style={styles.contactDetails}>
        <ContactAvatar
          firstName={fullName}
          lastName={""}
          image={call.image}
          avatarColor={avatarColor}
        />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{flexDirection:'column', flex:1 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <OutgoingCall
                strokeWidth={2.5}
                height={16}
                width={16}
                color={Colors.primary.green[100]}
              />
              <Text style={styles.contactName}>{fullName}</Text>
            </View>
            <Text style={styles.message}>{formatTime(call.timestamp)}</Text>
          </View>
          <Pressable onPress={() => onPressCall(call)} hitSlop={8}>
            <AnimatedIcon
              icon={CallIcon}
              direction="right"
              isBackground
              style={styles.iconContainer}
            />
          </Pressable>
          {/* //<Text style={styles.message}>{body}</Text> */}
        </View>
      </View>
    </AnimatedCard>
  );
});

const styles = StyleSheet.create({
  contactDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: Colors.primary.green[100],
    padding: 10,
    borderRadius: 16,
  },
  contactName: {
    fontFamily: "Baloo2-Bold",
    fontSize: 18,
    color: Colors.black,
  },
  message: {
    fontSize: 16,
    fontFamily: "Baloo2-SemiBold",
    color: Colors.text.gray,
  },
  time: {
    fontFamily: "Baloo2-Medium",
    fontSize: 12,
    color: Colors.text.gray,
  },
});
