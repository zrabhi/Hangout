import { useAppSettings } from "@/context/AppSettingsContext";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { callContact } from "@/nativeModule/sms/smsService";
import { PermissionType } from "@/types/Permissions";
import { type CrudOperationRetun } from "@/utils/TableCreationReturn";
import { PermissionsAndroid, ToastAndroid } from "react-native";

export const useCallContact = () => {

  const { handleAddCall } = useDataBaseContext();
  const { handleSetPermissionPrompt } = useAppSettings();


  const handleCallContact = async (
    address: string,
    contactId: number,
  ): Promise<CrudOperationRetun> => {
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

    const callAction = await callContact(address);
    if (!callAction.success) {
      ToastAndroid.show(`Error while calling ${address}`, ToastAndroid.TOP);
      return { success: false, id: 0 };
    }

    const result = await handleAddCall({
      address,
      contactId,
      timestamp: Date.now(),
    });
    return result;
  };
  return {
    handleCallContact,
  };
};
