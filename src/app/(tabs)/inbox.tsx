import { LastMessageCard } from "@/components/LastMessageCard";
import { EmptyListMessage } from "@/components/ui/EmptyList";
import { Loader } from "@/components/ui/Loader";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { type Inbox } from "@/types/Message";
import { appRoutes } from "@/utils/appRoutes";
import Colors from "@/utils/Colors";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function InboxScreen() {
  
  const { getInbox, isLoading } = useDataBaseContext();
  
  const [conversations, setConversations] = useState<Inbox[]>([]);
  
  const { t } = useAppSettings();

  const handleLoadInbox = async () => {
    const result = await getInbox();
    setConversations(result);
  };

  useFocusEffect(
    // Not best practice to do this .......... to change later
    useCallback(() => {
      handleLoadInbox();
    }, [])
  );


  const handleOnPress = (contactId: number) =>
    router.navigate({
      pathname: appRoutes.conversation,
      params: { id: contactId },
    });

  if (isLoading) return (
     <View style={{ flex: 1,alignItems:'center', justifyContent:'center' }}>
        <Loader />
      </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        contentContainerStyle={{
          paddingHorizontal: 16,
          margin: conversations.length === 0 ? "auto" : undefined,
        }}
        renderItem={({ item }) => (
          <LastMessageCard
            onPress={() => handleOnPress(item.contactId)}
            {...item}
          />
        )}
        ListEmptyComponent={
          <EmptyListMessage
            message={t("emptyInboxMessage")}
            illustartion={AquaticRetroIllustration}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
});
