import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationFR from "./locales/fr.json";

const language = localStorage.getItem("language") || "en";
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: language,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
const handelChangeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("language", lang);
}

export { i18n, handelChangeLanguage };
