import { CallIcon } from "@/icons/Call";
import { MessageIcon } from "@/icons/Message";
import { type Contact } from "@/types/Contacts";
import { avatarColors } from "@/utils/AvatarColors";
import Colors from "@/utils/Colors";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AnimatedCard } from "./ui/AnimatedCard";
import { AnimatedIcon } from "./ui/AnimatedIcon";
import { ContactAvatar } from "./ui/ContactAvatar";

interface ContactCardProps {
  contact: Contact;
  onPressCall: (
    address: string,
    contactId: number,
  ) => void;
}

export const ContactCard = ({ contact, onPressCall }: ContactCardProps) => {
  const colorIndex = contact.id % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  const fullName = `${contact.firstName} ${contact.lastName ?? ""}`;

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
            <Text numberOfLines={2} lineBreakMode="tail" style={styles.contactName}>{fullName}</Text>
            <Text  numberOfLines={2} lineBreakMode="tail" style={styles.phoneNumber}>{contact.address}</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable
              onPress={() =>
              {
                if (!contact.address || !contact.id) return;
                onPressCall(contact.address, contact.id)
              }
              }
              hitSlop={8}
            >
              <AnimatedIcon
                icon={CallIcon}
                direction="right"
                isBackground
                style={styles.iconContainer}
              />
            </Pressable>

            <Pressable onPress={handleOnPressMessage} hitSlop={8}>
              <AnimatedIcon
                onPress={handleOnPressMessage}
                icon={MessageIcon}
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
    backgroundColor: Colors.primary.green[100],
    padding: 10,
    borderRadius: 16,
  },
});
