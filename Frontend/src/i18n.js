import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-locize-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      projectId: "ddcd54c7-8317-4fa6-9b64-e74df48d6e63", // Replace this
      apiKey: "5bd69650-2cca-40fc-9ba1-643dcc927401", // Optional (development only)
      referenceLng: "en",
    },
    ns: ["Translations"],
    defaultNS: "Translations",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
