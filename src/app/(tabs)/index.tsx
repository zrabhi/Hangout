import { SearchInput } from "@/components/ui/SearchInput";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import { ContactCard } from "@/components/ContactCard";
import { type Contact } from "@/types/Contacts";
import Selector from "@/components/ui/Selector";
export default function ConatctsScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        await Contacts.requestPermissionsAsync();
        console.log("Permission to access contacts was denied");
        return;
      }
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          // fields: [Contacts.Fields.Emails],
        });
        setContacts(data as Contact[]);
        const contact = data;
        console.log(contact);
      }
    })();
  }, []);
 // const cdnRandomImage = "https://api.dicebear.com/7.x/personas/png?seed=3";

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SearchInput
          placeholder="Search ..."
          value={searchValue}
          onChange={setSearchValue}
        />
        <View style={styles.filters}>
          <Selector label="All contacts" selected />
          <Selector label="Favorites" selected={false} />
        </View>
        <View style={styles.container}>
          <FlashList
            data={contacts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <ContactCard
                id={item.id}
                phoneNumber="0661684418"
                firstName={item.firstName}
                lastName={item.lastName}
                isFavorite={item.isFavorite}
                image={item.image}
                imageAvailable={item.imageAvailable}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters:{
     flexDirection: "row", gap: 12 
  },
  contentContainer: {
    padding:24,
    gap:20,
    justifyContent: "space-between",
    flex: 1,
  },
  
});
