import { ColorCard } from "@/components/ui/ColorCard";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SelectableCard } from "@/components/ui/SelectableCard";
import { ItemCard } from "@/components/ui/SettingItemCard";
import { useAppSettings } from "@/context/AppSettingsContext";
import { PainIcon } from "@/icons/Paint";
import { AppColors } from "@/utils/AppColors";
import { AppLanguageCode } from "@/utils/AppLanguages";
import Colors from "@/utils/Colors";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const { headerColor, handleSetHeaderColor, lang, handleSetLanguage, t } =
    useAppSettings();
  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <ScreenHeader options={props} isSettingsShown={false} isTab={false}>
              <View style={styles.headerContainer}>
                <Text style={styles.fullName}>{t("settings")}</Text>
              </View>
            </ScreenHeader>
          ),
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 25,
          paddingHorizontal: 18,
          backgroundColor: Colors.background.screen,
        }}
        contentContainerStyle={{
          gap: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ItemCard
          Icon={PainIcon}
          variant={"green"}
          title={t("appHeaderColorTitle")}
          dialog={t("appHeaderColorDialog")}
        >
          {Object.entries(AppColors).map(([name, value]) => (
            <ColorCard
              key={name}
              name={t(name)}
              color={value}
              selected={headerColor === value}
              onPress={async() => await handleSetHeaderColor(value)}
            />
          ))}
        </ItemCard>
        <ItemCard
          Icon={PainIcon}
          variant="blue"
          title={t("appLanguageTitle")}
          dialog={t("appLanguageDialog")}
        >
          {Object.entries(AppLanguageCode).map(([name, value]) => (
            <SelectableCard
              key={name}
              label={t(value)}
              selected={lang === value}
              onPress={async() => await handleSetLanguage(value)}
            />
          ))}
        </ItemCard>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.screen,
  },
  fullName: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: "Baloo2-Bold",
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: "Baloo2-SemiBold",
    color: Colors.text.gray,
  },
});
