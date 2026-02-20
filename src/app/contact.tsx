import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ContactForm } from "@/containers/CreateContactForms";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { type Contact, contactCreationInit } from "@/types/Contacts";
import { type Errors } from "@/types/ContactsError";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// fake fetch

export default function ContactScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useAppSettings();
  const { createContact, updateContact, getContactById, deleteContact } =
    useDataBaseContext();
  const [contactInfo, setContactInfo] = useState<Contact>(contactCreationInit);
  const [errors, setErrors] = useState<Errors>({});
  const isEditing = !!id;

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!contactInfo.firstName?.trim()) {
      newErrors.firstName = t("firstNameRequired");
    } else if (contactInfo.firstName.trim().length < 2) {
      newErrors.firstName = t("firstNameTooShort");
    }

    if (!contactInfo.lastName?.trim()) {
      newErrors.lastName = t("lastNameRequired");
    } else if (contactInfo.lastName.trim().length < 2) {
      newErrors.lastName = t("lastNameTooShort");
    }

    if (!contactInfo.email?.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!contactInfo.address?.trim()) {
      newErrors.phoneNumber = t("phoneNumberRequired");
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(contactInfo.address)) {
      newErrors.phoneNumber = t("phoneNumberInvalid");
    }

    if (!contactInfo.postalCode?.trim()) {
      newErrors.postalCode = t("postalCodeRequired");
    } else if (!/^[A-Za-z0-9\s\-]{3,10}$/.test(contactInfo.postalCode)) {
      newErrors.postalCode = t("postalCodeInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isEditing && id) {
      getContactById(id.toString()).then(
        (data) => data && setContactInfo(data),
      );
    }
  }, [id,isEditing]);

  const handleOnPress = async () => {
    const result = validate();
    if (!result) return;
    if (!isEditing) {
      await createContact(contactInfo);
      router.back();
      return;
    }
    await updateContact(id.toString(), contactInfo);
  };

  const handleOnPressDelete = async () => {
    if (!contactInfo.id) return;

    deleteContact(contactInfo.id);
    router.back();
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? "Edit Contact" : "Create Contact",
          header: (props) => <ScreenHeader options={props} isTab={false} />,
        }}
      />
      <View style={styles.contentConatainer}>
       
        <ContactForm
          errors={errors}
          contact={contactInfo}
          onChange={setContactInfo}
        />
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing && (
          <Button
            style={styles.button}
            variant="danger"
            title={"Delete " + contactInfo.firstName}
            onClick={handleOnPressDelete}
          />
        )}
        <Button
          style={styles.button}
          variant="primary"
          title={isEditing ? "Update" : "Create"}
          onClick={handleOnPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentConatainer: {
    flex: 1,
    marginTop: 25,
  },
  button: {
    flex: 1,
  },
  // trashIcon: {
  //   position: "absolute",
  //   top: 0,
  //   right: 60,
  //   padding: 8,
  //   zIndex: 10,
  // },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 34,
  },
});
