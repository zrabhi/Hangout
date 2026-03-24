import Colors from "@/utils/Colors";
import { type ElementType, memo, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type ItemVariant = "blue" | "green" | "orange";
interface SettingItemCardProps  {
  Icon: ElementType;
  variant: ItemVariant;
  title: string;
  children: ReactNode;
  dialog: string;
}

export const ItemCard = memo(
  ({ Icon, title, dialog, variant, children }: SettingItemCardProps) => {
    return (
      <View style={styles.conatiner}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: Colors.background.header,
            borderWidth: 1,
            borderColor: Colors.black,
            padding: 24,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.primary[variant][100],
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              borderWidth: 1,
              borderColor: Colors.black,
            }}
          >
            <Icon color={Colors.white} strokeWidth={2.5} />
          </View>
          <View
            style={{
              justifyContent: "center",

            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontFamily: "Baloo2-Bold",
                fontSize: 16,
                color: Colors.primary[variant][100],
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Colors.text.gray,
                fontFamily: "Baloo2-SemiBold",
              }}
            >
              {dialog}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex:1,
            paddingVertical: 16,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors.black,
            flexDirection: "row",
            flexWrap: "wrap",
            borderBottomLeftRadius: 22,
            borderBottomRightRadius: 22,
            backgroundColor: Colors.background.card,
          }}
        >
          {children}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: Colors.primary.blue[100],
    fontFamily: "Baloo2-Bold",
  },
});
