import { useEffect, useState } from "react";
import { View, Text,Permission, FlatList, StyleSheet, TouchableOpacity, PermissionsAndroid } from "react-native";
import SmsAndroid from "react-native-get-sms-android";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type Sms = { _id: string; address: string; body: string; date: string; type: string };

export default function Conversations() {
  const { requestPermission } = usePermissionCheck(PermissionsAndroid.PERMISSIONS.READ_SMS);
  const [conversations, setConversations] = useState<Sms[]>([]);
  const navigation = useNavigation();


  
  const loadConversations = async () => {
    const getSms = (box: "inbox" | "sent") =>
      new Promise<Sms[]>((resolve) =>
        SmsAndroid.list(
          JSON.stringify({ box, maxCount: 1000 }),
          (fail) => resolve([]),
          (_, smsList) => resolve(JSON.parse(smsList))
        )
      );

    const inbox = await getSms("inbox");
    const sent = await getSms("sent");

    const allMessages = [...inbox, ...sent];

    const lastMessageMap: Record<string, Sms> = {};
    allMessages.forEach((msg) => {
      const existing = lastMessageMap[msg.address];
      if (!existing || Number(msg.date) > Number(existing.date)) {
        lastMessageMap[msg.address] = msg;
      }
    });

    const lastMessages = Object.values(lastMessageMap).sort(
      (a, b) => Number(b.date) - Number(a.date)
    );
    setConversations(lastMessages);
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      if (granted) loadConversations();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() =>
             router.navigate({pathname:'/conv', params:{id: item._id}})
            }
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
  messageItem: { marginBottom: 16, padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  address: { fontWeight: "bold", marginBottom: 4 },
  body: { color: "#333" },
});
