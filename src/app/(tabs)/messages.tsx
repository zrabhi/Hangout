import { LastMessageCard } from "@/components/LastMessageCard";
import { Loader } from "@/components/ui/Loader";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { Inbox } from "@/types/Message";
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

  const { getInbox: getLatestMessages, isLoading } = useDataBaseContext();
  const [conversations, setConversations] = useState<Inbox[]>([]);

  const loadConversations = async () => {
    const result = await getLatestMessages();
    console.log("latest", result);
    setConversations(result);
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      console.log(granted);
      console.log(granted);
      if (granted) loadConversations();
    })();
  }, []);

  const handleOnPress = (contactId: number) =>
    router.navigate({ pathname: "/conv", params: { id: contactId } });


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
