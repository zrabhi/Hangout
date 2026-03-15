import { MessageType } from "@/types/MessageTYpe";
import { useEffect } from "react";
import {
  EmitterSubscription,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from "react-native";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useAppSettings } from "@/context/AppSettingsContext";
import { initSmsModule } from "@/nativeModule/sms/smsService";
import { PermissionType } from "@/types/Permissions";
import { Message } from "@/types/Message";

type IncomingSms = {
  address: string;
  body: string;
  date: number;
};

export const useIncomingSms = () => {
  const { contacts, addMessage, convMessages, setConvMessages } =
    useDataBaseContext();
  const { handleSetPermissionPrompt, t } = useAppSettings();

  useEffect(() => {
    if (Platform.OS !== "android") return;

    let subscription: EmitterSubscription;

    const setup = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          handleSetPermissionPrompt(PermissionType.SMS_RECEIVE);
          return;
        }

        const smsEventEmitter = initSmsModule();

        if (!smsEventEmitter) {
          console.error("Sms event emitter is not initialized");
          return;
        }

        subscription = smsEventEmitter.addListener(
          "IncomingSms",
          async (sms: IncomingSms) => {
            try {
              let contact = contacts.find((c) => c.address === sms.address);
              if (!contact) return; // TODO: may be later i will add the feature to create contact if not exists
              const message: Message = {
                contactId: contact.id,

                address: sms.address,
                body: sms.body,
                date: sms.date,
                type: MessageType.RECIEVED,
                deleviryState: 1,
              };
              const result = await addMessage(message);
              if (result.success === false) {
                ToastAndroid.showWithGravityAndOffset(
                  `${t("errorSendingMessage")}`,
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                  ToastAndroid.TOP,
                  290,
                );
              } else {
                convMessages.address === sms.address
                  ? setConvMessages((prev) => ({
                      ...prev,
                      messages: [
                        ...prev.messages,
                        { ...message, id: result.id },
                      ],
                    }))
                  : ToastAndroid.showWithGravityAndOffset(
                      `${t("newMessageFrom")} ${sms.address}`,
                      ToastAndroid.LONG,
                      ToastAndroid.CENTER,
                      ToastAndroid.BOTTOM,
                      0,
                    );
              }
            } catch (error) {
              console.error("Error handling incoming SMS:", error);
            }
          },
        );
      } catch (error) {
        console.error("Error setting up incoming SMS listener:", error);
      }
    };
    setup();
    return () => {
      subscription?.remove();
    };
  }, [addMessage, setConvMessages, handleSetPermissionPrompt]);
};
