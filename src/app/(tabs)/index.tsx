import { SearchInput } from "@/components/ui/SearchInput";
import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { View, StyleSheet, Text } from "react-native";

export default function ConatctsScreen() {
  const [searchValue, setSearchValue] = useState("");

   useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if(status !== 'granted') {
        await Contacts.requestPermissionsAsync();
        console.log('Permission to access contacts was denied');
        return;
      }
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          // fields: [Contacts.Fields.Emails],
        });
        const contact = data;
        console.log(contact[0].phoneNumbers);
      }
      
    })();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SearchInput
          placeholder="Search contacts..."
          value={searchValue}
          onChange={setSearchValue}
        />
        <Text style={styles.text}>Contacts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  text: {
    fontSize: 20,
    fontFamily: "Baloo2-SemiBold",
  },
});
