import { StarIcon } from "@/icons/Star";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/utils/Colors";

interface ContactCardProps {
  isFavorite: boolean;
  firstName: string;
  lastName: string;
  imageAvailable: boolean;
  image: { uri: string } | null;
  phoneNumber: string;
  id: string;
}

export const ContactCard = ({
  isFavorite,
  firstName,
  id,
  lastName,
  phoneNumber,
}: ContactCardProps) => {
  const cdnRandomImage = `https://api.dicebear.com/7.x/personas/png?seed=${id}`;
  return (
    <Pressable
      onPress={() => console.log("card pressed")}
      style={styles.button}
    >
      <View style={styles.contactDetails}>
        <Image source={{ uri: cdnRandomImage }} style={styles.contactImage} />
        <View>
          <Text style={styles.contactName}>{firstName + " " + lastName}</Text>
          <Text style={styles.phineNumber}>{phoneNumber}</Text>
        </View>
      </View>
      {isFavorite && (
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
      )}
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
    backgroundColor: Colors.white,
  },
  cardActions:{
     alignItems: "flex-start" 
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
    fontSize: 14,
    fontFamily: "Baloo2-Regular",
    color: "gray",
  },
  phineNumber: {
    fontSize: 14,
    fontFamily: "Baloo2-Regular",
    color: "gray",
  },
});
