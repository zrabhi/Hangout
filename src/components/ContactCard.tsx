import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";
import { type Contact } from "@/types/Contacts";
import { router } from "expo-router";
import { CallIcon } from "@/icons/Call";
import { MessageIcon } from "@/icons/Message";

interface ContactCardProps {
  contact: Contact;
  onPressCall:  (address: string, contactName: string)  => Promise<void>
}

export const ContactCard = ({ contact,onPressCall }: ContactCardProps) => {
  const cdnRandomImage = `https://api.dicebear.com/9.x/toon-head/svg?seed=r${contact.firstName}`;

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
          <Text style={styles.phoneNumber}>{contact?.address}</Text>
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
                address: contact?.address,
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
           onPressCall(contact?.address, fullName);
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
    gap: 12,
    padding:15,
    borderWidth: 1.3,
    borderRadius: 15,
    backgroundColor: Colors.background.card,
  },
  contactDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactImage: {
    width: 50,
    height: 50,
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
