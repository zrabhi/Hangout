import { SearchIcon } from "@/icons/Search";
import Colors from "@utils/Colors";
import { StyleSheet, TextInput, View } from "react-native";


interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (input: string) => void;
}
export const SearchInput = ({ placeholder = 'Search...', value, onChange }: SearchInputProps  ) => {
  return (
    <View style={styles.container}>
      <SearchIcon height={20} width={20} strokeWidth={2.5} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        selectionColor={Colors.primary.orange[100]}
        // cursorColor={Colors.primary.orange[100]}
        placeholderTextColor={Colors.black}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 18,
    marginBottom: 16,
    height: 52,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 14,
  },
  input: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 16,
    color: Colors.black,
  },
});
