import { View, StyleSheet, Text } from "react-native";

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Baloo2-SemiBold",
  },
});
