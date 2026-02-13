import { Pressable, Text, StyleSheet, type PressableProps } from "react-native";
import Colors from "@utils/Colors";

interface SelectorProps extends PressableProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function Selector({
  label,
  selected = false,
  onPress,
}: SelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, selected && styles.selectedContainer]}
    >
      <Text style={[styles.text, !selected && styles.unselectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },

  selectedContainer: {
    backgroundColor: Colors.primary.green[100],
  },

  text: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 12,
    color: Colors.white,
  },

  unselectedText: {
    color: Colors.black,
  },
});
