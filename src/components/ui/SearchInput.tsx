import { SearchIcon } from "@/icons/Search";
import Colors from "@utils/Colors";
import { useCallback, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

  const handleSetIsFocused = useCallback(
    (focused: boolean) => {
      setIsFocused(focused);
    },
    [isFocused],
  );
  return (
    <View
      style={{
          width: "100%",
          alignItems: "center",
          paddingVertical: 16,
        }}
    >
      <View
        style={[styles.searchInput, isFocused && styles.focusedSearchInput]}
      >
        <SearchIcon
          height={20}
          width={20}
          color={Colors.text.gray}
          strokeWidth={2.5}
        />
        <TextInput
          editable={isEditable}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          selectionColor={Colors.primary.orange[100]}
          placeholderTextColor={Colors.text.gray}
          style={styles.input}
          onFocus={() => handleSetIsFocused(true)}
          onBlur={() => handleSetIsFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputConatiner: {
    backgroundColor: Colors.background.header,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  focusedSearchInput: {
    borderWidth:2,
  },
  searchInput: {
    width: "90%",
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    height: 52,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 16,
  },
  input: {
    width: "90%",
    alignItems: "center",
    borderColor: Colors.black,
    fontFamily: "Baloo2-SemiBold",
    fontSize: 14,
    color: Colors.black,
  },
});
