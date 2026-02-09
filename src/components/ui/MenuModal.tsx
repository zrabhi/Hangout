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

interface MenuModalProps {
  isMenuVisible: boolean;
  onClose: VoidFunction;
}

export const MenuModal = ({ isMenuVisible, onClose }: MenuModalProps) => {
  return (
    <Modal
      style={styles.modal}
      visible={isMenuVisible}
      animationType="slide"
      transparent
    >
      <BlurView style={styles.blurContainer}>
        <View style={styles.menuContiner}>
          <Text style={styles.text}>Menu</Text>
          <Button variant="secondary" onClick={() => {}} title="Apply" />
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
    alignItems: "center",
    borderWidth: 1.5,
    zIndex: 100,
    justifyContent: "space-between",
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
