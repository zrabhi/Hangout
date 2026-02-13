import { type ElementType, memo } from "react";
import { View,Text,StyleSheet } from "react-native";

interface EmptyListMessageProps {
    illustartion: ElementType;
    message?:string 
}

export const EmptyListMessage = memo(({message, illustartion}: EmptyListMessageProps) => {
    const Illustartion = illustartion
    return (
      <View style={styles.container}>
        <Illustartion/>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Baloo2-Medium",
  },
});