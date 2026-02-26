import { CallCard } from "@/components/CallCard";
import { Loader } from "@/components/ui/Loader";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useCallContact } from "@/hooks/usecCallContact";
import { type Calls } from "@/types/Calls";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function CallsScreen() {
  const { getCallList, isLoading } = useDataBaseContext();

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

  useEffect(() => {
    handleGetCallsList();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id?.toString() ?? ""}
        data={calls}
        showsVerticalScrollIndicator={false}
        extraData={calls}
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
