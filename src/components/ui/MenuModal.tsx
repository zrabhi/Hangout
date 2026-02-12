import Colors from "@/utils/Colors";
import { BlurView } from "expo-blur";
import {
  Pressable,
  Text,
  View,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import { Button } from "./Button";
import Selector from "./Selector";
import { useLanguage } from "@/context/TranlsationContext";
import { useState } from "react";

interface MenuModalProps {
  isMenuVisible: boolean;
  onClose: VoidFunction;
}

export const MenuModal = ({ isMenuVisible, onClose }: MenuModalProps) => {
  const { lang, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(lang);

  const handleOnApply = () => {
    setLanguage(selectedLang);
    onClose();
  };

  return (
    <Modal
      style={styles.modal}
      visible={isMenuVisible}
      animationType="slide"
      transparent
    >
      <BlurView style={styles.blurContainer}>
        <View style={styles.menuContiner}>
          <Text style={styles.title}>Menu</Text>
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
              <View
                style={styles.color}
              />
              <View
                style={styles.color}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
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
  modal: {
    flex: 1,
  },
  button:{
 width: "100%" 
  },
  menuOptionConatiner: {
    gap: 12,
    alignItems: "flex-start",
  },color:{
                  padding: 14,
                  backgroundColor: "green",
                  borderRadius: 10,
  },
  selectorConatiner: {
    paddingLeft: 2,
    flexDirection: "row",
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
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
  menuContiner: {
    borderWidth: 1.5,
    zIndex: 100,
    backgroundColor:
      Platform.OS === "ios" ? "transparent" : Colors.background.card,
    height: Platform.OS === "ios" ? "50%" : "70%",
    width: "60%",
    padding: 20,

    borderRadius: 16,
    paddingLeft: 20,
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
