import React, { createContext, useContext, useState } from "react";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const translations = { en, ar };
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [lang, setLang] = useState("en"); // default language

  const t = (key) => translations[lang][key] || key;

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
