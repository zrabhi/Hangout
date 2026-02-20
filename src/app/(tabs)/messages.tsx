import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { router } from "expo-router";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { type Message } from "@/types/Message";


export default function Conversations() {
  const { requestPermission } = usePermissionCheck(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
  );

  const { getLatestMessages } = useDataBaseContext();
  const [conversations, setConversations] = useState<Message[]>([]);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => handleOnPress(item.contactId)}
          >
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </TouchableOpacity>
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
