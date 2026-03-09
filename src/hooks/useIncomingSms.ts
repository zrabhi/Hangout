// useIncomingSms.ts
import { useEffect } from "react";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { initSmsModule, onIncomingSms } from "@/nativeModule/sms/smsService";
import { MessageType } from "@/types/MessageTYpe";
import { useAppSettings } from "@/context/AppSettingsContext";
import { PermissionsAndroid } from "react-native";
import { PermissionType } from "@/types/Permissions";

export const useIncomingSms = () => {
  const { contacts, addMessage, createContact, getConatctsList } =
    useDataBaseContext();
  const { handleSetPermissionPrompt } = useAppSettings();
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setup = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        handleSetPermissionPrompt(PermissionType.SMS_RECEIVE);
        return null;
    }
    await initSmsModule();

      unsubscribe = onIncomingSms(
        async (sms: { address: string; body: string; date: number }) => {
          try {
            console.log("Incoming SMS in hook:", sms);

            let contact = contacts.find((c) => c.address === sms.address);

            if (!contact) {
              const newContact = {
                id: "",
                firstName: sms.address,
                lastName: null,
                address: null,
                postalCode: null,
                email: null,
                image: null,
              };
              const result = await createContact(newContact);
              newContact.id = result.id.toString();
              contact = newContact;
            }

            await addMessage({
              contactId: parseInt(contact.id, 10),
              address: sms.address,
              body: sms.body,
              date: sms.date,
              type: MessageType.RECIEVED,
              deleviryState: 1,
            });

            await getConatctsList();
          } catch (err) {
            console.error("Error handling incoming SMS in hook:", err);
          }
        },
      );
    };

    setup();

    return () => {
      unsubscribe?.();
    };
  }, []);
};
