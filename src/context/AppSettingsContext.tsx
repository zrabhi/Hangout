import { useOrientation } from "@/hooks/useOrientation";
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

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  headerColor: string;
  isLandscape: boolean;
  setHeaderColor: Dispatch<SetStateAction<string>>;
  t: (key: keyof typeof translations.en) => string;
}

const AppSettingContext = createContext<LanguageContextType | null>(null);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const { isLandscape } = useOrientation();
  const [language, setLanguage] = useState<Language>("en");
  const [headerColor, setHeaderColor] = useState<string>(AppColors.WHITE);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return (
    <AppSettingContext.Provider
      value={{
        setLanguage,
        lang: language,
        t,
        headerColor,
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
