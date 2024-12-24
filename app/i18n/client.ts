'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg, Trans } from 'react-i18next';
import i18nResourcesToBackend from 'i18next-resources-to-backend';
import i18nLanguageDetector from 'i18next-browser-languagedetector';
import { fallbackLng, languages } from './config';
import { getCookie } from '../services/lib/helpers';
import { Language, SettingsObj } from '../services/models';
import { useEffect } from 'react';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(i18nLanguageDetector)
  .use(
    i18nResourcesToBackend(
      (language: string) => import(`./dictionaries/${language}.json`)
    )
  )
  .init({
    debug: false,
    supportedLngs: languages,
    fallbackLng: fallbackLng,
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['cookie', 'htmlTag', 'navigator']
    },
    preload: runsOnServerSide ? languages : []
  });

export const useTranslation = () => {
  const ret = useTranslationOrg();
  const { i18n } = ret;

  useEffect(() => {
    const settings = getCookie('settings');
    const settingsObj: SettingsObj = settings ? JSON.parse(settings) : null;
    const lng: Language = settingsObj?.language || fallbackLng;  

    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  return { ...ret, Trans };
};