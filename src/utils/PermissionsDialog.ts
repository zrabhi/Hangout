import { type tranlsationKeyType } from "@/context/AppSettingsContext";
import { PermissionType } from "@/types/Permissions";

export const PermissionsDialog: Record<PermissionType, tranlsationKeyType> = {
  [PermissionType.SMS_READ]: "smsReadPermission",
  [PermissionType.SMS_SEND]: "smsSendPermission",
  [PermissionType.CALL_PHONE]: "callPhonePermission",
  [PermissionType.SMS_RECEIVE]: "smsReceivePermission",
  [PermissionType.MEDIA] :"photoPermission"
};
