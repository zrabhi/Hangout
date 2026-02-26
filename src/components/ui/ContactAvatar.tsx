import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";

interface ContactAvatarProps {
  firstName: string;
  lastName: string | null;
  image: string | null;
  avatarColor: string;
}

export const ContactAvatar = memo(
  ({ firstName, lastName, image, avatarColor }: ContactAvatarProps) => {
    const initials = lastName
      ? `${firstName[0]}${lastName[0]}`
      : firstName.slice(0, 2);

    return image ? (
      <Image
        source={{ uri: image }}
        style={[styles.avatar, { borderColor: avatarColor }]}
      />
    ) : (
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initials.toUpperCase()}</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation:13
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Baloo2-Bold",
  },
});