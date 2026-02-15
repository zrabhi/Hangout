import { NativeModules, Platform, PermissionsAndroid } from "react-native";

const { SmsModule } = NativeModules;

export interface SmsResult {
  success: boolean;
  error?: string;
}


export const sendSms = async (
  phoneNumber: string,
  message: string
): Promise<SmsResult> => {
  try {
    if (!phoneNumber || !message) {
      return { success: false, error: "Phone number or message is empty" };
    }

    if (Platform.OS !== "android") {
      return { success: false, error: "Native SMS is only supported on Android" };
    }

    // ✅ Request runtime permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return { success: false, error: "SEND_SMS permission denied" };
    }

    // ✅ Call native module
    await SmsModule.sendSms(phoneNumber, message);

    return { success: true };
  } catch (error: any) {
    // ✅ Return structured error
    return { success: false, error: error.message || "Unknown error sending SMS" };
  }
};
