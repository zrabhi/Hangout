import { useOrientation } from "@/hooks/useOrientation";
import { PermissionType } from "@/types/Permissions";
import { AppColors } from "@/utils/AppColors";
import { type Language, translations } from "@/utils/Translation";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { Linking } from "react-native";

export type tranlsationKeyType = keyof typeof translations.en;
interface PermissionPromptState {
  visible: boolean;
  permission: PermissionType | null;
}

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  handleSetPermissionPrompt: (permission: PermissionType | null) => void,
  headerColor: string;
  isLandscape: boolean;
  handleCloseModal: () => void
  permissionPrompt: PermissionPromptState,
  handlePressSettingButton: () => void,
  setHeaderColor: Dispatch<SetStateAction<string>>;
  t: (key: tranlsationKeyType) => string;
}

const AppSettingContext = createContext<LanguageContextType | null>(null);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const { isLandscape } = useOrientation();
  const [language, setLanguage] = useState<Language>("en");
  const [headerColor, setHeaderColor] = useState<string>(AppColors.WHITE);

  const [permissionPrompt, setPermissionPrompt] =
    useState<PermissionPromptState>({
      visible: false,
      permission: null,
    });

  const handleCloseModal = () => {
    setPermissionPrompt({
      visible: false,
      permission: null,
    });
  };

  const handleSetPermissionPrompt = (permission: PermissionType  | null) =>{
    setPermissionPrompt({
      visible:true,
      permission
    })
  }

  const handlePressSettingButton = () => {
      Linking.openSettings();
      handleCloseModal();
    };



  const t = (key: tranlsationKeyType) => translations[language][key];

  return (
    <AppSettingContext.Provider
      value={{
        setLanguage,
        lang: language,
        handleSetPermissionPrompt,
        t,
        handleCloseModal,
        permissionPrompt,
        headerColor,
        handlePressSettingButton,
        setHeaderColor,
        isLandscape,
      }}
    >
      {children}
    </AppSettingContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingContext);
  if (!context)
    throw new Error("useAppSettings must be used inside LanguageProvider");
  return context;
};
