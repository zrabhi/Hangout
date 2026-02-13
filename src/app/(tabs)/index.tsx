import { ContactCard } from "@/components/ContactCard";
import { EmptyListMessage } from "@/components/ui/EmptyList";
import { SearchInput } from "@/components/ui/SearchInput";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useContactsSearch } from "@/hooks/useContactSearch";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
export default function ConatctsScreen() {
  const { t } = useAppSettings();
  const { getConatctsList, contacts } = useDataBaseContext();

  const { searchValue, setSearchValue, filteredContacts } =
    useContactsSearch(contacts);

  useEffect(() => {
    getConatctsList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SearchInput
          placeholder={t("search")}
          value={searchValue}
          onChange={setSearchValue}
        />
        <View style={styles.filters}>
          {/* <Selector label={t("allContacts")} selected />
          <Selector label={t("favorites")} selected={false} /> */}
        </View>
        <View style={styles.container}>
          <FlashList
            extraData={contacts}
            contentContainerStyle={[ styles.listContentConatiner, {
              margin: contacts.length === 0 ? "auto" : undefined,
            }]}
            ListEmptyComponent={
              <EmptyListMessage
                message="Sadly, your contact list is empty . Add a new contact or sync with your phone to get started!"
                illustartion={AquaticRetroIllustration}
              />
            }
            data={filteredContacts}
            showsVerticalScrollIndicator
            renderItem={({ item }) => <ContactCard contact={item} />}
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
  listContentConatiner:{
              paddingHorizontal: 10,
  },
  contentContainer: {
    padding: 24,
    gap: 16,
    flex: 1,
  },
});
