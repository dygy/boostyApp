import React, {useEffect, useState, useContext} from 'react';
import * as RNLocalize from 'react-native-localize';
import {getData, setData} from '../helpers/storage';

const LanguageContext = React.createContext();

const translationGetters = {
  en: () => require('../lang/translations/en.json'),
  ru: () => require('../lang/translations/ru.json'),
};

const fallback = {
  languageTag: 'ru',
  isRTL: false,
};

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('ru');
  const [value, setValue] = useState({});

  useEffect(() => {
    (async () => {
      let appLang = (await getData('appLang')) || null;

      if (!appLang) {
        const {languageTag} =
          RNLocalize.findBestAvailableLanguage(
            Object.keys(translationGetters),
          ) || fallback;
        appLang = languageTag;
      }

      changeLanguage(appLang);
    })();
  }, []);

  const changeLanguage = async lang => {
    let newLang = lang;
    if (!translationGetters[lang]) {
      newLang = 'en';
    }
    setLanguage(newLang);
    setValue({
      ...translationGetters[newLang](),
    });
    await setData('appLang', newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        ...value,
        language,
        languages: Object.keys(translationGetters),
        changeLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
