import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { callContact } from "@/nativeModule/sms/smsService";
import { PermissionType } from "@/types/Permissions";
import { PermissionsAndroid } from "react-native";

interface AddCallReturnType {
  success: boolean;
  id: number;
}
export const useCallContact = () => {
  const { handleAddCall } = useDataBaseContext();
  const { handleSetPermissionPrompt } = useAppSettings();
  const handleCallContact = async (
    address: string,
    contactName: string,
    contactId: number,
  ): Promise<AddCallReturnType> => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      handleSetPermissionPrompt(PermissionType.CALL_PHONE);
      return {
        success: false,
        id: 0,
      };
    }
    
    const result = await callContact(address);
    console.log("no permission")
    if (!result.success) return { success: false, id: 0 };

    const id = await handleAddCall({
      address,
      contactId,
      contactName,
      timestamp: Date.now().toString(),
    });
    return {
      success: true,
      id,
    };
  };
  return {
    handleCallContact,
  };
};
