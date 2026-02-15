import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/utils/Colors";
import { type Contact } from "@/types/Contacts";
import { router } from "expo-router";
import { CallIcon } from "@/icons/Call";
import { MessageIcon } from "@/icons/Message";

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const cdnRandomImage = `https://api.dicebear.com/7.x/personas/png?seed=${contact.id}`;

  const fullName = contact.firstName + " " + contact.lastName;
  return (
    <Pressable
      onPress={() =>
        router.navigate({ pathname: "/contact", params: { id: contact.id } })
      }
      style={styles.button}
    >
      <View style={styles.contactDetails}>
        <Image
          source={{ uri: contact.image ?? cdnRandomImage }}
          style={styles.contactImage}
        />
        <View>
          <Text style={styles.contactName}>{fullName}</Text>
          <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <Pressable
          style={styles.actionButton}
          onPress={(e) => {
            e.stopPropagation();
            router.navigate({
              pathname: "/conv",
              params: {
                fullName,
                id: contact.id,
                image: contact.image,
                phoneNumber: contact.phoneNumber,
              },
            });
          }}
        >
          <MessageIcon strokeWidth={2} fill={Colors.white} />
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={(e) => {
            e.stopPropagation();
            Linking.openURL(`tel:${contact.phoneNumber}`);
          }}
        >
          <CallIcon strokeWidth={2} fill={Colors.white} />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    gap: 12,
    borderWidth: 1.3,
    paddingLeft: 8,
    borderRadius: 14,
    backgroundColor: "rgb(242, 242, 242)",
  },
  contactDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
  },
  contactName: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 14,
    color: Colors.black,
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: "Baloo2-Medium",
    color: "gray",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: Colors.primary.orange[100],
    justifyContent: "center",
    alignItems: "center",
  },
});
