import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translations/en/common.json";
import tr from "../translations/tr/common.json";

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
