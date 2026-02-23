import { type SmsMessage, type SmsResult } from "@/types/SmsMessage";
import {
  NativeModules,
  Platform,
  PermissionsAndroid,
} from "react-native";

const { SmsModule } = NativeModules;

//const smsEventEmitter = new NativeEventEmitter(SmsModule);

// r

export const getConversation = async (
  phoneNumber: string,
): Promise<SmsMessage[] | null> => {
  try {
    if (Platform.OS !== "android") return null;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn("READ_SMS permission denied");
      return null;
    }

    const messages: SmsMessage[] = await SmsModule.getConversation(phoneNumber);
    return messages;
  } catch (e: any) {
    console.error("Failed to fetch conversation:", e);
    return null;
  }
};

export const callContact = async (phoneNumber: string) => {
  try {
   
     await SmsModule.callNumber(phoneNumber);
    return {success:true};
  } catch (error: any) {
    console.log("Call failed:", error);
    return {
      success: false,
      error: error.message || "Unknown error while calling ",
    };
  }
};

export const sendSms = async (
  phoneNumber: string,
  message: string,
): Promise<SmsResult> => {
  try {
    if (!phoneNumber || !message) {
      return { success: false, error: "Phone number or message is empty" };
    }

    if (Platform.OS !== "android") {
      return {
        success: false,
        error: "Native SMS is only supported on Android",
      };
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return { success: false, error: "SEND_SMS permission denied" };
    }

    await SmsModule.sendSms(phoneNumber, message);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error sending SMS",
    };
  }
};
