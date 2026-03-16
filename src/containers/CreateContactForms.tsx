import { Input } from "@/components/ui/Input";
import { SquarePenIcon } from "@/icons/SquarePen";
import { ContactCreation, type Contact } from "@/types/Contacts";
import { useState, type Dispatch, type SetStateAction } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import Colors from "@/utils/Colors";
import { type Errors } from "@/types/ContactsError";
import { useAppSettings } from "@/context/AppSettingsContext";
import { PermissionModal } from "@/components/ui/PermissionsMessageModal";
import { ItemCard } from "@/components/ui/SettingItemCard";
import { CallIcon } from "@/icons/Call";
import { BuildingIcon } from "@/icons/BuildingIcon";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { CameraIcon } from "@/icons/CameraIcon";
import { PersonIcon } from "@/icons/PersonIcon";

interface ConatctFromProps {
  contact: ContactCreation;
  errors: Errors;
  onChange: Dispatch<SetStateAction<ContactCreation>>;
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={[
              styles.photoContainer,
              !contact.image && { backgroundColor: Colors.primary.blue[100] },
            ]}
            onPress={handlePickImage}
          >
            {contact.image ? (
              <Image source={{ uri: contact.image }} style={styles.photo} />
            ) : (
              <PersonIcon
                height={64}
                width={64}
                strokeWidth={1.5}
                color={Colors.white}
              />
            )}

            <View
              style={{
                position: "absolute",
                bottom: -10,
                right: -10,
              }}
            >
              <AnimatedIcon
                style={{
                  backgroundColor: Colors.primary.orange[100],
                }}
                icon={CameraIcon}
              />
            </View>
          </Pressable>
          <ItemCard
            variant="blue"
            Icon={PersonIcon}
            title={t("personalInfoTitle")}
            dialog={t("requiredDetailsDialog")}
          >
            <Input
              maxLength={20}
              selectTextOnFocus
              label={t("firstName")}
              placeHolder={
                t("inputPlaceHolder") + " " + t("firstName").toLowerCase()
              }
              value={contact.firstName ?? ""}
              error={errors["firstName"]}
              onChangeText={(text: string) =>
                onChange({ ...contact, firstName: text })
              }
            />
            <Input
              maxLength={20}
              selectTextOnFocus
              label={t("lastName")}
              error={errors["lastName"]}
              placeHolder={
                t("inputPlaceHolder") + " " + t("lastName").toLowerCase()
              }
              value={contact.lastName ?? ""}
              onChangeText={(text: string) =>
                onChange({ ...contact, lastName: text })
              }
            />
          </ItemCard>
          <ItemCard
            Icon={CallIcon}
            variant="orange"
            title={t("contactDetails")}
            dialog={t("requiredDetailsDialog")}
          >
            <Input
              maxLength={30}
              label={t("email")}
              placeHolder={
                t("inputPlaceHolder") + " " + t("email").toLowerCase()
              }
              value={contact.email ?? ""}
              error={errors["email"]}
              onChangeText={(text: string) => onChange({ ...contact, email: text })}
            />

            <Input
              maxLength={14}
              error={errors["phoneNumber"]}
              label={t("phoneNumber")}
              placeHolder={
                t("inputPlaceHolder") + " " + t("phoneNumber").toLowerCase()
              }
              value={contact.address ?? ""}
              onChangeText={(text: string) =>
                onChange({ ...contact, address: text })
              }
            />
          </ItemCard>
          <ItemCard
            Icon={BuildingIcon}
            variant="green"
            title="Additional Info"
            dialog="Optional Details"
          >
            <Input
              maxLength={8}
              label={t("postalCode")}
              error={errors["address"]}
              value={contact.postalCode ?? ""}
              placeHolder={
                t("inputPlaceHolder") + " " + t("postalCode").toLowerCase()
              }
              onChangeText={(text: string) =>
                onChange({ ...contact, postalCode: text })
              }
            />
            <Input
              maxLength={40}
              label={t("address")}
              error={errors["homeAddress"]}
              value={contact.homeAddress ?? ""}
              placeHolder={
                t("inputPlaceHolder") + " " + t("address").toLowerCase()
              }
              onChangeText={(text: string) =>
                onChange({ ...contact, homeAddress: text })
              }
            />
          </ItemCard>
        </ScrollView>
      </KeyboardAvoidingView>
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
    justifyContent: "center",
    gap: 22,
    paddingVertical: 20,
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    gap: 20,
    padding: 20,
  },

  keyBoardContainer: {
    flex: 1,
    alignItems: "center",
    gap: 22,
    paddingVertical: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 36,
  },
  labelConatiner: {
    position: "absolute",

    top: 0,
    left: 14,
    paddingHorizontal: 4,
    backgroundColor: Colors.white,
    transform: [{ translateY: -10 }],
  },

  photoContainer: {
    borderStyle: "dashed",
    width: 130,
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  photo: {
    width: 128,
    height: 128,
    borderRadius: 10,
  },
});
