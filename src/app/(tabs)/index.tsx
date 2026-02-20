import { ContactCard } from "@/components/ContactCard";
import { EmptyListMessage } from "@/components/ui/EmptyList";
import { SearchInput } from "@/components/ui/SearchInput";
import Selector from "@/components/ui/Selector";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useContactsSearch } from "@/hooks/useContactSearch";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { callContact } from "@/nativeModule/sms/smsService";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
export default function ConatctsScreen() {
  const { t } = useAppSettings();
  const { getConatctsList, contacts, handleAddCall } = useDataBaseContext();

  const { searchValue, setSearchValue, filteredContacts } =
    useContactsSearch(contacts);

  useEffect(() => {
    getConatctsList();
  }, []);

  const handleCallContact = async (address: string, contactName: string) => {
    const result = await callContact(address);
    console.log("imhereeee", result)
    if (!result.success) return; // i need to display toested in red , indicating failed attempt
    
    await handleAddCall({
      address,
      contactName,
      timestamp: Date.now().toString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SearchInput
          placeholder={t("search")}
          value={searchValue}
          onChange={setSearchValue}
        />
        <View style={styles.filters}>
          <Selector label={t("allContacts")} selected />
          <Selector label={t("favorites")} selected={false} />
        </View>
        <View style={styles.container}>
          <FlashList
            extraData={contacts}
            contentContainerStyle={[
              styles.listContentConatiner,
              contacts.length === 0 && 
              {
                margin: contacts.length
              },
            ]}
            ListEmptyComponent={
              <EmptyListMessage
                message="Sadly, your contact list is empty . Add a new contact or sync with your phone to get started!"
                illustartion={AquaticRetroIllustration}
              />
            }
            data={filteredContacts}
            showsVerticalScrollIndicator
            renderItem={({ item }) => <ContactCard onPressCall={handleCallContact} contact={item} />}
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
  filters: {
    flexDirection: "row",
    gap: 12,
  },
  listContentConatiner: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingHorizontal: 28,
    gap: 23,
    flex: 1,
  },
});
