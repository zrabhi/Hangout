import { type Inbox } from "@/types/Message";
import { avatarColors } from "@/utils/AvatarColors";
import Colors from "@/utils/Colors";
import { memo } from "react";
import {
  type PressableProps,
  StyleSheet,
  Text,
  View
} from "react-native";
import { AnimatedCard } from "./ui/AnimatedCard";
import { ContactAvatar } from "./ui/ContactAvatar";

interface LastMessageCardProps extends PressableProps, Omit<Inbox, "type"> {
  address: string;
  onPress: VoidFunction;
}

export const InboxCard = memo(
  ({
    body,
    onPress,
    firstName,
    lastName,
    date,
    contactId,
    image,
    deleviryState,
  }: LastMessageCardProps) => {
    const colorIndex = contactId % avatarColors.length;
    const avatarColor = avatarColors[colorIndex];
    const fullName = `${firstName} ${lastName}`;

    return (
      <AnimatedCard color={avatarColor} onPress={onPress}>
        <View style={styles.contactDetails}>
          <ContactAvatar
            firstName={firstName ?? ""}
            lastName={lastName ?? ""}
            image={image}
            avatarColor={avatarColor}
          />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text  numberOfLines={2} lineBreakMode="tail" style={styles.contactName}>{fullName}</Text>
            <Text numberOfLines={2} lineBreakMode="tail" style={styles.message}>{body}</Text>
          </View>
        </View>
      </AnimatedCard>
    );
  },
);

const styles = StyleSheet.create({
  contactDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    flex: 1,
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
