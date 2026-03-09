import { CallCard } from "@/components/CallCard";
import { EmptyListMessage } from "@/components/ui/EmptyList";
import { Loader } from "@/components/ui/Loader";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useCallContact } from "@/hooks/usecCallContact";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { type Calls } from "@/types/Calls";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function CallsScreen() {
  const { getCallList, isLoading } = useDataBaseContext();
  const { t } = useAppSettings();
  const [calls, setCalls] = useState<Calls[]>([]);
  const { handleCallContact } = useCallContact();

  const handleOnPressCallContact = async (call: Calls) => {
    const result = await handleCallContact(
      call.address,
      call.contactName,
      call.contactId,
    );

    if (!result.success) return;

    setCalls((prev) => [{ ...call, id: result.id }, ...prev]);
  };

  const handleGetCallsList = async () => {
    const result = await getCallList();
    setCalls(result);
  };

  useFocusEffect(
      useCallback(() => {
        handleGetCallsList();
      }, [])
  );

  if (isLoading)
    return (
      <View style={{ flex: 1,alignItems:'center', justifyContent:'center' }}>
        <Loader />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id?.toString() ?? ""}
        data={calls}
        contentContainerStyle={{
          paddingHorizontal: 16,
          margin: calls.length === 0 ? "auto" : undefined,
        }}
        showsVerticalScrollIndicator={false}
        extraData={calls}
        ListEmptyComponent={
          <EmptyListMessage
            message={t("emptyCallsMessage")}
            illustartion={AquaticRetroIllustration}
          />
        }
        renderItem={({ item }) => (
          <CallCard onPressCall={handleOnPressCallContact} call={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
