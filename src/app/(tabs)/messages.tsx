import { LastMessageCard } from "@/components/LastMessageCard";
import { Loader } from "@/components/ui/Loader";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { Inbox } from "@/types/Message";
import { appRoutes } from "@/utils/appRoutes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  View
} from "react-native";

export default function Conversations() {
  const { requestPermission } = usePermissionCheck(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
  );

  const { getInbox, isLoading } = useDataBaseContext();
  const [conversations, setConversations] = useState<Inbox[]>([]);

  const loadConversations = async () => {
    const result = await getInbox();
    setConversations(result);
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      if (granted) loadConversations();
    })();
  }, []);

  const handleOnPress = (contactId: number) =>
    router.navigate({ pathname: appRoutes.conversation, params: { id: contactId } });

   if (isLoading) return <Loader />;
   
  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <LastMessageCard
            onPress={() => handleOnPress(item.contactId)}
            
            {...item}
          />
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  messageItem: {
    marginBottom: 16,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  address: { fontWeight: "bold", marginBottom: 4 },
  body: { color: "#333" },
});
