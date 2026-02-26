import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";
import { type Contact } from "@/types/Contacts";
import { router, useFocusEffect } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import React, { useCallback } from "react";
import { RotatingIcon } from "./ui/RotatingIcon";
import { CallIcon } from "@/icons/Call";
import { MessageIcon } from "@/icons/Message";
import { ContactAvatar } from "./ui/ContactAvatar";
import { AnimatedCard } from "./ui/AnimatedCard";
import { avatarColors } from "@/utils/AvatarColors";

interface ContactCardProps {
  contact: Contact;
  onPressCall?: (
    address: string,
    contactName: string,
    contactId: number,
  ) => void;
}

export const ContactCard = ({ contact, onPressCall }: ContactCardProps) => {
  const colorIndex = contact.id % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  const fullName = `${contact.firstName} ${contact.lastName}`;

  const handleOnPressMessage = () =>
    router.navigate({ pathname: "/conv", params: { id: contact.id } });

  const handleOnPressCard = () =>
    router.navigate({ pathname: "/contact", params: { id: contact.id } });
  return (
    <>
      <AnimatedCard color={avatarColor} onPress={handleOnPressCard}>
        <View style={styles.contactDetails}>
          <ContactAvatar
            firstName={contact.firstName ?? ""}
            lastName={contact.lastName ?? ""}
            image={contact.image}
            avatarColor={avatarColor}
          />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={styles.contactName}>{fullName}</Text>
            <Text style={styles.phoneNumber}>{contact.address}</Text>
          </View>

          {/* Action Icons */}
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable
              onPress={() =>
                onPressCall?.(contact.address, fullName, contact.id)
              }
              hitSlop={8}
            >
              <RotatingIcon
                icon={CallIcon}
                variant="green"
                direction="right"
                isBackground
                style={styles.iconContainer}
              />
            </Pressable>

            <Pressable onPress={handleOnPressMessage} hitSlop={8}>
              <RotatingIcon
                onPress={handleOnPressMessage}
                icon={MessageIcon}
                variant="green"
                direction="right"
                isBackground
                style={styles.iconContainer}
              />
            </Pressable>
          </View>
        </View>
      </AnimatedCard>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "70%",
    height: 1,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginTop: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Baloo2-Bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background.card,
    padding: 12,
    marginTop: 14,
    paddingRight: 18,
    borderRadius: 0,
    borderLeftWidth: 30,
    borderLeftColor: "transparent",
  },
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
  phoneNumber: {
    fontSize: 16,
    fontFamily: "Baloo2-Medium",
    color: Colors.text.gray,
  },
  iconContainer: {
    backgroundColor: Colors.background.icon,
    padding: 10,
    borderRadius: 16,
  },
});
