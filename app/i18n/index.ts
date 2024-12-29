import { createInstance } from 'i18next';
import i18nResourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { Language, SettingsObj } from '../services/models';
import { fallbackLng, languages } from './config';
import { cookies } from 'next/headers';

const initI18next = async (lng: Language) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      i18nResourcesToBackend(
        (language: string) => import(`./dictionaries/${language}.json`)
      )
    )
    .init({
      debug: false,
      supportedLngs: languages,
      fallbackLng: fallbackLng,
      lng
    });

  return i18nInstance;
};

export const getSavedLanguage = (): Language => {
  const cookieStore = cookies();
  const settings = cookieStore.get('settings')?.value || '';
  const settingsObj: SettingsObj = settings ? JSON.parse(settings) : null;
  return settingsObj?.language || fallbackLng;
};

export const getTranslation = async () => {
  const lng = getSavedLanguage();
  const i18nextInstance = await initI18next(lng);

  return {
    t: i18nextInstance.getFixedT(lng),
    i18n: i18nextInstance
  };
};
