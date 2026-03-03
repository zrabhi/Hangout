import { ContactCard } from "@/components/ContactCard";
import { EmptyListMessage } from "@/components/ui/EmptyList";
import { Loader } from "@/components/ui/Loader";
import { SearchInput } from "@/components/ui/SearchInput";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useCallContact } from "@/hooks/usecCallContact";
import { useContactsSearch } from "@/hooks/useContactSearch";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function ConatctsScreen() {
  const { t } = useAppSettings();

  const { getConatctsList, contacts, isLoading } = useDataBaseContext();
  const { handleCallContact } = useCallContact();

  const { searchValue, setSearchValue, filteredContacts } =
    useContactsSearch(contacts);

  useEffect(() => {
    getConatctsList();
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder={t("search")}
        value={searchValue}
        onChange={setSearchValue}
      />
      <View style={styles.contentContainer}>
        <View style={styles.container}>
          <FlashList
            extraData={contacts}
            contentContainerStyle={[
              styles.listContentConatiner,
              {
                margin: contacts.length === 0 ? "auto" : undefined,
              },
            ]}
            keyExtractor={(item) => item.id?.toString() ?? ""}
            ListEmptyComponent={
              <EmptyListMessage
                message={t("emptyContactsMessage")}
                illustartion={AquaticRetroIllustration}
              />
            }
            data={filteredContacts}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <ContactCard onPressCall={handleCallContact} contact={item} />
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
  listContentConatiner: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    gap: 23,
    flex: 1,
  },
});
