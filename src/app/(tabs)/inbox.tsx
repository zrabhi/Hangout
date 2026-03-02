import { LastMessageCard } from "@/components/LastMessageCard";
import { Loader } from "@/components/ui/Loader";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { type Inbox } from "@/types/Message";
import { appRoutes } from "@/utils/appRoutes";
import Colors from "@/utils/Colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function InboxScreen() {
  const { getInbox, isLoading } = useDataBaseContext();
  const [conversations, setConversations] = useState<Inbox[]>([]);

  const handleLoadInbox = async () => {
    const result = await getInbox();
    setConversations(result);
  };

  useEffect(() => {
    handleLoadInbox();
  }, []);

  const handleOnPress = (contactId: number) =>
    router.navigate({
      pathname: appRoutes.conversation,
      params: { id: contactId },
    });

  if (isLoading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        contentContainerStyle={{paddingHorizontal:16}}
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
  container: { flex: 1, backgroundColor: Colors.white },
});
