import React, { createContext, useState, useContext } from "react";


// Create TranslationContext
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );
  const direction = language === "ar" ? "rtl" : "ltr";

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // Save to localStorage
  };

  return (
    <TranslationContext.Provider
      value={{
        t: translations[language],
        language,
        changeLanguage,
        direction,
      }}
    >
      <div dir={direction}>{children}</div>
    </TranslationContext.Provider>
  );
};

// Custom hook to access the translations and change language
export const useTranslation = () => useContext(TranslationContext);
