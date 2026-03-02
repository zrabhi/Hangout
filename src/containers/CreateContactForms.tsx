import { Input } from "@/components/ui/Input";
import { SquarePenIcon } from "@/icons/SquarePen";
import { type Contact } from "@/types/Contacts";
import { useState, type Dispatch, type SetStateAction } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";

import Colors from "@/utils/Colors";
import { type Errors } from "@/types/ContactsError";
import { useAppSettings } from "@/context/AppSettingsContext";
import { PermissionModal } from "@/components/ui/PermissionsMessageModal";

interface ConatctFromProps {
  contact: Contact;
  errors: Errors;
  onChange: Dispatch<SetStateAction<Contact>>;
}

export const ContactForm = ({
  contact,
  onChange,
  errors,
}: ConatctFromProps) => {
  const [isPermissionModalVisible, setPermissionModal] =
    useState<boolean>(false);
  const { t } = useAppSettings();

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      setPermissionModal(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      onChange({ ...contact, image: result.assets[0].uri });
    }
  };

  const handlePressSettingButton = () => {
    Linking.openSettings();
    setPermissionModal(false);
  };

  const handleCloseModal = () => {
    setPermissionModal(false);
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.photoContainer} onPress={handlePickImage}>
          <View style={styles.labelConatiner}>
            <Text style={styles.photoLabel}>{t("photo")}</Text>
          </View>
          {contact.image && (
            <Image source={{ uri: contact.image }} style={styles.photo} />
          )}

          <Pressable style={styles.uploadImageButton} onPress={handlePickImage}>
            <SquarePenIcon
              color={Colors.white}
              strokeWidth={2.5}
              height={14}
              width={14}
            />
            <Text style={styles.photoPlaceholder}>
              {contact.image !== null ? t("changePhoto") : t("photoUpload")}
            </Text>
          </Pressable>
        </Pressable>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          <Input
            label={t("firstName")}
            placeHolder={
              t("inputPlaceHolder") + " " + t("firstName").toLowerCase()
            }
            value={contact.firstName}
            error={errors["firstName"]}
            onChange={(text: string) =>
              onChange({ ...contact, firstName: text })
            }
          />
          <Input
            label={t("lastName")}
            error={errors["lastName"]}
            placeHolder={
              t("inputPlaceHolder") + " " + t("lastName").toLowerCase()
            }
            value={contact.lastName}
            onChange={(text: string) =>
              onChange({ ...contact, lastName: text })
            }
          />
          <Input
            label={t("email")}
            placeHolder={t("inputPlaceHolder") + " " + t("email").toLowerCase()}
            value={contact.email}
            error={errors["email"]}
            onChange={(text: string) => onChange({ ...contact, email: text })}
          />

          <Input
            error={errors["phoneNumber"]}
            label={t("phoneNumber")}
            placeHolder={
              t("inputPlaceHolder") + " " + t("phoneNumber").toLowerCase()
            }
            value={contact.address}
            onChange={(text: string) => onChange({ ...contact, address: text })}
          />
          <Input
            label={t("postalCode")}
            error={errors["postalCode"]}
            value={contact.postalCode}
            placeHolder={
              t("inputPlaceHolder") + " " + t("postalCode").toLowerCase()
            }
            onChange={(text: string) =>
              onChange({ ...contact, postalCode: text })
            }
          />
        </ScrollView>
      </View>
      <PermissionModal
        onClose={handleCloseModal}
        onPress={handlePressSettingButton}
        isModalVisible={isPermissionModalVisible}
        message={t("photoPermission")}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    gap: 22,
    paddingVertical: 20,
  },
  uploadImageButton: {
    position: "absolute",
    padding: 8,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary.green[100],
    borderRadius: 10,
    borderWidth: 1.5,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    paddingTop: 34,
    flexDirection: "column",
    alignItems: "center",
    gap: 36,
    paddingHorizontal: 20,
  },
  labelConatiner: {
    position: "absolute",

    top: 0,
    left: 14,
    paddingHorizontal: 4,
    backgroundColor: Colors.white,
    transform: [{ translateY: -10 }],
  },
  photoLabel: {
    fontSize: 13,
    fontFamily: "Baloo2-Medium",
  },
  photoContainer: {
    borderStyle: "dashed",
    width: 130,
    height: 100,
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  photo: {
    width: 115,
    height: 85,
    borderRadius: 6,
  },
  photoPlaceholder: {
    fontFamily: "Baloo2-SemiBold",
    fontSize: 10,
    color: Colors.white,
  },
});
