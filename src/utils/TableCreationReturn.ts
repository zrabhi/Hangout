import { type tranlsationKeyType } from "@/context/AppSettingsContext";

export interface CrudOperationRetun {
  success: boolean;
  message?:tranlsationKeyType
  id: number;
}
