import { SearchIcon } from "@/icons/Search";
import Colors from "@utils/Colors";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  isEditable?: boolean;
  onChange: (input: string) => void;
}

export const SearchInput = ({
  placeholder = "Search...",
  value,
  isEditable = true,
  onChange,
}: SearchInputProps) => {

  return (
    <View style={styles.container}>
      <SearchIcon height={20} width={20} strokeWidth={2.5} />
      <TextInput
        editable={isEditable}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        selectionColor={Colors.primary.orange[100]}
        placeholderTextColor={Colors.black}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 14,
  },
  input: {
    width: "90%",
    alignItems: "center",
    fontFamily: "Baloo2-SemiBold",
    fontSize: 14,
    color: Colors.black,
  },
});
