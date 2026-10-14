import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type TranslationKey } from "../i18n/translations";

export type Lang = "pt" | "en";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem("lang");
  if (stored === "pt" || stored === "en") return stored;
  return "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  function toggleLang() {
    setLang((l) => (l === "pt" ? "en" : "pt"));
  }

  function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations.pt[key] ?? key;
  }

  return <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
