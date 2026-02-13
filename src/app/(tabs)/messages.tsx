import { EmptyListMessage } from "@/components/ui/EmptyList";
import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import { View, StyleSheet } from "react-native";

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <EmptyListMessage
        message="Sadly, your contact list is empty . Add a new contact or sync with your phone to get started!"
        illustartion={AquaticRetroIllustration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
});
