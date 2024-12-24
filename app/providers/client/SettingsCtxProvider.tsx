'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { LanguageItem, Recitation, ScriptItem, SettingsObj } from '../../services/models';
import { LANGUAGES_LIST, RECITATIONS_LIST, SCRIPTS_LIST } from '../../services/lib';
import { getCookie } from '../../services/lib/helpers';

type SettingsState = {
  selectedLng: LanguageItem;
  setSelectedLng: (lng: LanguageItem) => void;
  selectedScript: ScriptItem;
  setSelectedScript: (script: ScriptItem) => void;
  selectedRecitation: Recitation;
  setSelectedRecitation: (recitation: Recitation) => void;
};

const INITIAL_STATE = {
  selectedLng: LANGUAGES_LIST[0],
  setSelectedLng: () => {},
  selectedScript: SCRIPTS_LIST[2],
  setSelectedScript: () => {},
  selectedRecitation: RECITATIONS_LIST[1],
  setSelectedRecitation: () => {}
};

const SettingsContext = createContext<SettingsState>(INITIAL_STATE);

export const useSettings = (): SettingsState => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('Please use SettingsProvider in parent component');
  }

  return context;
};

const SettingsCtxProvider = ({ children }: PropsWithChildren) => {
  const [selectedLng, setSelectedLng] = useState<LanguageItem>(INITIAL_STATE.selectedLng);
  const [selectedScript, setSelectedScript] = useState<ScriptItem>(INITIAL_STATE.selectedScript);
  const [selectedRecitation, setSelectedRecitation] = useState<Recitation>(INITIAL_STATE.selectedRecitation);

  const fetchSavedSettings = () => {
    const settings = getCookie('settings');    
    const settingsObj: SettingsObj = settings ? JSON.parse(settings) : null;
    
    const lngObj = LANGUAGES_LIST.find((l) => l.iso_code === settingsObj?.language);
    const scriptObj = SCRIPTS_LIST.find((s) => s.code === settingsObj?.script);
    const recitationObj = RECITATIONS_LIST.find((r) => r.id === Number(settingsObj?.recitation));

    if (lngObj) setSelectedLng(lngObj);
    if (scriptObj) setSelectedScript(scriptObj);
    if (recitationObj) setSelectedRecitation(recitationObj);
  }

  useEffect(() => {
    fetchSavedSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        selectedLng,
        setSelectedLng,
        selectedScript,
        setSelectedScript,
        selectedRecitation,
        setSelectedRecitation
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsCtxProvider;
