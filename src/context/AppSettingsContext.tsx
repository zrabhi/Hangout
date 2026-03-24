import { useOrientation } from "@/hooks/useOrientation";
import { type PermissionType } from "@/types/Permissions";
import { AppColorName, AppColors } from "@/utils/AppColors";
import { AppLanguageCode } from "@/utils/AppLanguages";
import { getItem, setItem } from "@/utils/Storage";
import { translations } from "@/utils/Translation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Linking } from "react-native";

export type tranlsationKeyType = keyof typeof translations.en;
interface PermissionPromptState {
  visible: boolean;
  permission: PermissionType | null;
}

interface LanguageContextType {
  lang: AppLanguageCode;
  handleSetLanguage: (lang: AppLanguageCode) => Promise<void>;
  handleSetPermissionPrompt: (permission: PermissionType | null) => void;
  headerColor: string;
  isLandscape: boolean;
  handleCloseModal: () => void;
  permissionPrompt: PermissionPromptState;
  handlePressSettingButton: () => void;
  handleSetHeaderColor: (color: string) => Promise<void>;
  t: (key: tranlsationKeyType) => string;
}

const AppSettingContext = createContext<LanguageContextType | null>(null);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const { isLandscape } = useOrientation();
  const [language, setLanguage] = useState<AppLanguageCode>(AppLanguageCode.EN);

  const [headerColor, setHeaderColor] = useState<string>(
    AppColors[AppColorName.WHITE],
  );

  useEffect(() => {
    async function loadSettings() {
      try {
        const savedLang = await getItem<AppLanguageCode>("LANGUAGE");
        if (savedLang) setLanguage(savedLang);

        const savedColor = await getItem<string>("HEADER_COLOR");
        if (savedColor) setHeaderColor(savedColor);
      } catch (error) {
        console.error("Failed to load app settings:", error);
      }
    }
    loadSettings();
  }, []);

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

  const handleSetPermissionPrompt = (permission: PermissionType | null) => {
    setPermissionPrompt({
      visible: true,
      permission,
    });
  };

  const handlePressSettingButton = () => {
    Linking.openSettings();
    handleCloseModal();
  };

  const handleSetLanguage = async (lang: AppLanguageCode) => {
    setLanguage(lang);
    await setItem("LANGUAGE", lang);
  };

  const handleSetHeaderColor = async (color: string) => {
    setHeaderColor(color);
    await setItem("HEADER_COLOR", color);
  };

  const t = (key: tranlsationKeyType) => translations[language][key];

  return (
    <AppSettingContext.Provider
      value={{
        handleSetLanguage,
        lang: language,
        handleSetPermissionPrompt,
        t,
        handleCloseModal,
        permissionPrompt,
        headerColor,
        handlePressSettingButton,
        handleSetHeaderColor,
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
