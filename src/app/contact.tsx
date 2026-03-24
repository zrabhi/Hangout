import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ContactForm } from "@/containers/CreateContactForms";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { type ContactCreation, contactCreationInit } from "@/types/Contacts";
import { type Errors } from "@/types/ContactsError";
import Colors from "@/utils/Colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

// fake fetch

export default function ContactScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useAppSettings();
  const isEditing = !!id;

  const {
    handleCreateContact: createContact,
    handleUpdateContact: updateContact,
    getContactById,
    handleDeleteContact: deleteContact,
    setContacts,
    isLoading,
  } = useDataBaseContext();

  const [contactInfo, setContactInfo] =
    useState<ContactCreation>(contactCreationInit);

  const [errors, setErrors] = useState<Errors>({});

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isEditing && id) {
      getContactById(id.toString()).then(
        (data) => data && setContactInfo(data),
      );
    }
    return () => setContactInfo(contactCreationInit)
  }, [id, isEditing]);

  const handleOnPress = async () => {
    const result = validate();
    if (!result) return;
    if (!isEditing) {
      const result = await createContact(contactInfo);
      if (result.success === false && result.message) {
        ToastAndroid.showWithGravityAndOffset(
          `${t(result?.message)} `,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          ToastAndroid.BOTTOM,
          0,
        );
      }
    }
    else {
      await updateContact(id.toString(), contactInfo);
    }
    router.back();
  };

  const handleOnPressDelete = async () => {
    if (!id) return;

    deleteContact(id.toString());
    setContacts((prev) => prev.filter((contact) => contact.id !== Number(id)));
    router.back();
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? t("editContact") : t("createContact"),
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
            title={t("deleteContactAction") + contactInfo.firstName}
            onClick={handleOnPressDelete}
          />
        )}
        <Button
          style={styles.button}
          variant="primary"
          title={
            isEditing ? t("updateContactAction") : t("createContactAction")
          }
          onClick={handleOnPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentConatainer: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: Colors.white,
  },
  button: {
    flex: 1,
  },
  buttonsContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 34,
  },
});
