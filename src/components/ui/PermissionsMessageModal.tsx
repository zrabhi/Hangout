import { AquaticRetroIllustration } from "@/icons/RetroAquatic";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  type ModalProps,
  Pressable,
} from "react-native";
import { Button } from "./Button";
import { BlurView } from "expo-blur";
import Colors from "@/utils/Colors";

interface PermissionModalProps extends ModalProps {
  isModalVisible: boolean;
  message: string;
  onPress: VoidFunction;
  onClose: VoidFunction;
}

export const PermissionModal = ({
  message,
  onClose,
  isModalVisible,
  onPress,
  ...rest
}: PermissionModalProps) => {
  return (
    <Modal
      supportedOrientations={["landscape", "portrait", "portrait-upside-down"]}
      visible={isModalVisible}
      transparent
      style={styles.modal}
      animationType="slide"
      {...rest}
    >
      <BlurView experimentalBlurMethod="dimezisBlurView" style={styles.permissionWarning}>
        <AquaticRetroIllustration width={78} height={78} />
        <Text style={styles.permissionText}>{message}</Text>
        <Button
          title="Open Settings"
          variant="primary"
          style={styles.settingsButton}
          onClick={onPress}
        />
        
        <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  permissionWarning: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  closeButton: {
    position: "absolute",
    top: "10%",
    right: "10%",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: "Baloo2-Bold",
  },
  closeOverlay: {
    width: 21,
    height: 21,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderColor: Colors.white,
    borderWidth: 1.5,
  },

  modal: {
    flex: 1,
  },
  // permissionImage: {
  //   width: 150,
  //   height: 120,
  // },
  permissionText: {
    textAlign: "center",
    fontFamily: "Baloo2-Medium",
    fontSize: 13,
  },
  settingsButton: {
    paddingHorizontal: 20,
  },
});
