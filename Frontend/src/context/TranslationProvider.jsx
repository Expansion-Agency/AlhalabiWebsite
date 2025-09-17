import React, { createContext, useContext, useEffect, useState } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const translations = { en, ar };

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  // Load from localStorage or fallback to browser language
  const getDefaultLang = () => {
    const saved = localStorage.getItem("lang");
    if (saved) return saved;
    const browserLang = navigator.language.split("-")[0]; // e.g. "en" or "ar"
    return translations[browserLang] ? browserLang : "en";
  };

  const [lang, setLang] = useState(getDefaultLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang; // update <html lang="..">
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; // support RTL
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);

