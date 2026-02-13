import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { type Contact, contactCreationInit } from "@/types/Contacts";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ContactForm } from "@/containers/CreateContactForms";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useLanguage } from "@/context/TranlsationContext";
import { type Errors } from "@/types/ContactsError";

// fake fetch

export default function ContactScreen() {
  const { id } = useLocalSearchParams();
   const { t } = useLanguage();
  const { createContact, updateContact, getContactById } = useDataBaseContext();
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

      if (!contactInfo.phoneNumber?.trim()) {
        newErrors.phoneNumber = t("phoneNumberRequired");
      } else if (!/^\+?[0-9\s\-]{7,15}$/.test(contactInfo.phoneNumber)) {
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
      getContactById(id.toString()).then((data) => data && setContactInfo(data));
    }
  }, [id]);

  const handleOnPress = async () => {
    const result = validate();
    if (!result) 
        return
    if (!isEditing) {
      await createContact(contactInfo);
      return;
    }
    await updateContact(id.toString(), contactInfo);
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
        <ContactForm errors={errors} contact={contactInfo} onChange={setContactInfo} />
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing && (
          <Button
            style={styles.button}
            variant="secondary"
            title="Cancel"
            onClick={() => console.log("Cancel edit")}
          />
        )}
        <Button
          style={styles.button}
          variant="primary"
          title={isEditing ? "Confirm" : "Create"}
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
  button:{
    flex:1
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 34,
  },
});
