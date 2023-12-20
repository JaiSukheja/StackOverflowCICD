import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './languageSelector.css'; // Make sure to import your existing styles
import languageContext from '../../context/languageContext';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const { setLang }:any = useContext(languageContext);
  

  const changeLanguage = (language:any) => {
    i18n.changeLanguage(language);
    setLang(language);
    localStorage.setItem('language', language);
  };

  return (
    <div className="languageSelector">
      <select
        id="language"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="languageSelectorButton"
      >
        <option value="en" className='option'>English</option>
        <option value="hi" className='option'>हिन्दी</option>
        <option value="fr" className='option'>Français</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
