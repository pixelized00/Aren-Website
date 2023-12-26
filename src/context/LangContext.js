import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext();

const LanguageContextProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("i18nextLng")
      ? localStorage.getItem("i18nextLng")
      : "tr"
  );

  useEffect(() => {}, [lang]);

  const updateLang = (lang) => {
    localStorage.setItem("i18nextLng", lang);
    setLang(lang);
  };

  return (
    <LangContext.Provider value={{ lang, updateLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLangContext = () => {
  return useContext(LangContext);
};

export default LanguageContextProvider;
