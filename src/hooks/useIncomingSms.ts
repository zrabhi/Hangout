import { MessageType } from "@/types/MessageTYpe";
import { useEffect, useRef, useState } from "react";
import {
  AppState,
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
  const smsEmitterRef = useRef(initSmsModule());
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "android") return;
    if (AppState.currentState !== "active") return;

    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          handleSetPermissionPrompt(PermissionType.SMS_RECEIVE);
          return;
        }

        setHasPermission(true);
      } catch (error) {
        console.error("Error requesting SMS permission:", error);
      }
    };

    requestPermission();
  }, [handleSetPermissionPrompt]);

  useEffect(() => {
    if (!hasPermission) return;

    const emitter = smsEmitterRef.current;
    if (!emitter) {
      console.error("SMS event emitter is not initialized");
      return;
    }

    const subscription = emitter.addListener(
      "IncomingSms",
      async (sms: IncomingSms) => {
        try {
          const contact = contacts.find((c) => c.address === sms.address);
          if (!contact) return;

          const message: Message = {
            contactId: contact.id,
            address: sms.address,
            body: sms.body,
            date: sms.date,
            type: MessageType.RECIEVED,
            deleviryState: 1,
          };

          const result = await addMessage(message);

          if (!result.success) {
            ToastAndroid.showWithGravityAndOffset(
              t("errorSendingMessage"),
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              ToastAndroid.TOP,
              290,
            );
            return;
          }

          if (convMessages.address === sms.address) {
            setConvMessages((prev) => ({
              ...prev,
              messages: [...prev.messages, { ...message, id: result.id }],
            }));
          } else {
            ToastAndroid.showWithGravityAndOffset(
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

    return () => subscription.remove();
  }, [hasPermission, contacts, addMessage, convMessages, setConvMessages, t]);
};
