import { ContactCard } from "@/components/ContactCard";
import { EmptyListMessage } from "@/components/ui/EmptyList";
import { Loader } from "@/components/ui/Loader";
import { SearchInput } from "@/components/ui/SearchInput";
import Selector from "@/components/ui/Selector";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useCallContact } from "@/hooks/usecCallContact";
import { useContactsSearch } from "@/hooks/useContactSearch";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { Contact } from "@/types/Contacts";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

export default function ConatctsScreen() {
  const { t } = useAppSettings();

  const { getConatctsList, contacts, isLoading } = useDataBaseContext();
  const { handleCallContact } = useCallContact();

  const { searchValue, setSearchValue, filteredContacts } =
    useContactsSearch(contacts);

  useEffect(() => {
    getConatctsList();
  }, []);

  const handleOnPressCall = async (contact: Contact) => {
    console.log("im here", contact)
    const fullName = contact.firstName + " " + contact.lastName;
    const result = await handleCallContact(
      contact?.address,
      fullName,
      contact.id,
    );
    if (!result.success) {
      ToastAndroid.show(`Error while calling ${fullName}`, ToastAndroid.TOP);
      return;
    }
  };

  if (isLoading) return <Loader />;

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
              contacts.length === 0 && {
                margin: contacts.length,
              },
            ]}
            ListEmptyComponent={
              <EmptyListMessage
                message={t("emptyContactsMessage")}
                illustartion={AquaticRetroIllustration}
              />
            }
            data={filteredContacts}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <ContactCard
                onPressCall={() => handleOnPressCall(item)}
                contact={item}
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
  activeIndocator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
