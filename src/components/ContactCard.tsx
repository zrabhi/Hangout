import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";
import { type Contact } from "@/types/Contacts";
import { router } from "expo-router";

interface ContactCardProps {

  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const cdnRandomImage = `https://api.dicebear.com/7.x/personas/png?seed=${contact.id}`;
  return (
    <Pressable
      onPress={() =>
        router.navigate({ pathname: "/contact", params: { id: contact.id } })
      }
      style={styles.button}
    >
      <View style={styles.contactDetails}>
        <Image source={{ uri: contact.image ?? cdnRandomImage }} style={styles.contactImage} />
        <View>
          <Text style={styles.contactName}>
            {contact.firstName + " " + contact.lastName}
          </Text>
          <Text style={styles.phoneNumber}>{contact.phoneNumber}</Text>
        </View>
      </View>
      {/* {contact.isFavorite && (
        <Pressable
          style={styles.cardActions}
          onPress={() => console.log("pressed")}
        >
          <StarIcon
            width={16}
            height={16}
            strokeWidth={2.5}
            color={"none"}
            fill={"none"}
          />
        </Pressable>
      )} */}
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
    backgroundColor: 'rgb(242, 242, 242)',
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
});
