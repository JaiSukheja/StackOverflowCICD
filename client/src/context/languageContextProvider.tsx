import { useEffect, useState } from "react";
import languageContext from "./languageContext";
import i18n from "../i18n";

const LanguageContextProvider = ({ children }: any) => {

    const [lang, setLang] = useState(localStorage.getItem('language'))
    useEffect(() => {
        if (lang === null) {
          localStorage.setItem('language', 'en');
          setLang('en');
        } else {
          i18n.changeLanguage(lang);
          setLang(lang);
        }
      }, []);

    return (
        <languageContext.Provider value={{ lang, setLang }}>
            {children}
        </languageContext.Provider>
    )
}

export default LanguageContextProvider
