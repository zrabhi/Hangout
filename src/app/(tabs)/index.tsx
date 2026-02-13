import { SearchInput } from "@/components/ui/SearchInput";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import { ContactCard } from "@/components/ContactCard";
import Selector from "@/components/ui/Selector";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useLanguage } from "@/context/TranlsationContext";
export default function ConatctsScreen() {
  const { t } = useLanguage();
  const { getConatctsList, contacts } = useDataBaseContext();

  const [searchValue, setSearchValue] = useState("");

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
          <Selector label={t("allContacts")} selected />
          <Selector label={t("favorites")} selected={false} />
        </View>
        <View style={styles.container}>
          <FlashList
            extraData={contacts}
            data={contacts}
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
  contentContainer: {
    padding: 24,
    gap: 20,
    justifyContent: "space-between",
    flex: 1,
  },
});
