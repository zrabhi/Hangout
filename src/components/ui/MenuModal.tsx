import { useAppSettings } from "@/context/AppSettingsContext";
import { AppColors } from "@/utils/AppColors";
import Colors from "@/utils/Colors";
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  Modal,
  type ModalProps,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "./Button";
import Selector from "./Selector";

interface MenuModalProps extends ModalProps {
  isMenuVisible: boolean;
  onClose: VoidFunction;
}

export const MenuModal = ({
  isMenuVisible,
  onClose,
  ...rest
}: MenuModalProps) => {

  const { lang, isLandscape, setLanguage, t, headerColor, setHeaderColor } =
    useAppSettings();

  const [selectedLang, setSelectedLang] = useState(lang);
  const [selectedColor, setSelectedColor] = useState<string>(headerColor);

  const handleOnApply = () => {
    // ineed to check if something changes before 
    setLanguage(selectedLang);
    setHeaderColor(selectedColor);
    onClose();
  };

  return (
    <Modal
      supportedOrientations={["landscape", "portrait","portrait-upside-down"]}
      style={styles.modal}
      visible={isMenuVisible}
      animationType="slide"
      transparent
      {...rest}
    >
      <BlurView style={styles.blurContainer}>
        <View
          style={[
            styles.menuContiner,
            isLandscape && styles.menuContinerLandscape,
          ]}
        >
          <Text style={styles.title}>Menu</Text>
          <ScrollView
            showsVerticalScrollIndicator={isLandscape}
            style={{ flex: 1 }}
            contentContainerStyle={{
              gap: 24,
            }}
          >
            <View style={styles.menuOptionConatiner}>
              <Text style={styles.text}>{t("language")}</Text>
              <View style={styles.selectorConatiner}>
                <Selector
                  label="En"
                  selected={selectedLang === "en"}
                  onPress={() => setSelectedLang("en")}
                />
                <Selector
                  label="Fr"
                  selected={selectedLang === "fr"}
                  onPress={() => setSelectedLang("fr")}
                />
              </View>
            </View>
            <View style={styles.menuOptionConatiner}>
              <Text style={styles.text}>{t("headerColor")}</Text>
              <View style={styles.selectorConatiner}>
                {[
                  AppColors.GREEN,
                  AppColors.ORANGE,
                  AppColors.BLUE,
                  AppColors.WHITE,
                ].map((color) => (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.color,
                      {
                        backgroundColor: color,
                        borderWidth: selectedColor === color ? 3 : 1.5,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View
            style={[styles.buttonContainer, isLandscape && { paddingTop: 20 }]}
          >
            <Button
              style={styles.button}
              variant="primary"
              onClick={handleOnApply}
              title="Apply"
            />
          </View>
        </View>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <View style={styles.closeOverlay}>
            <Text style={styles.closeButtonText}>X</Text>
          </View>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuContiner: {
    borderWidth: 1.5,
    zIndex: 100,
    height: "70%",
    backgroundColor:
      Platform.OS === "ios" ? "transparent" : Colors.background.card,
    padding: 20,
    borderRadius: 16,
    width: "65%",
  },

  menuContinerLandscape: {
    width: "60%",
    height: "90%",
  },
  modal: {
    flex: 1,
  },
  button: {
    width: "100%",
  },
  menuOptionConatiner: {
    gap: 12,
    alignItems: "flex-start",
  },
  color: {
    padding: 12,
    paddingLeft:16,
    backgroundColor: "green",
    borderRadius: 10,
  },
  selectorConatiner: {
    paddingLeft: 2,
    flexDirection: "row",
    gap: 10,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  closeButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.green[100],
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: "Baloo2-Bold",
  },

  closeOverlay: {
    width: 21,
    height: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary.orange[100],
    borderRadius: 16,
    borderColor: Colors.white,
    borderWidth: 1.5,
  },
  blurContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    paddingTop: 64,
    paddingLeft: 34,
  },
  text: {
    fontFamily: "Baloo2-Medium",
    fontSize: 14,
  },
  title: {
    textAlign: "center",
    fontFamily: "Baloo2-SemiBold",
    fontSize: 18,
    marginBottom: 10,
  },
});
