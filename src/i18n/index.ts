import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: { translation: require('./locales/en/common.json') },
  hi: { translation: require('./locales/hi/common.json') }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: Localization.locale.startsWith('hi') ? 'hi' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
