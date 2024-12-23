'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Recitation, ScriptItem, SettingsObj } from '../../models';
import { RECITATIONS_LIST, SCRIPTS_LIST } from '../../services/lib';
import { getCookie } from '../../services/lib/helpers';

type SettingsState = {
  selectedScript: ScriptItem;
  setSelectedScript: (script: ScriptItem) => void;
  selectedRecitation: Recitation;
  setSelectedRecitation: (recitation: Recitation) => void;
};

const INITIAL_STATE = {
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
  const [selectedScript, setSelectedScript] = useState<ScriptItem>(INITIAL_STATE.selectedScript);
  const [selectedRecitation, setSelectedRecitation] = useState<Recitation>(INITIAL_STATE.selectedRecitation);

  useEffect(() => {
    const settings = getCookie('settings');    
    const settingsObj: SettingsObj = settings ? JSON.parse(settings) : null;
    const scriptObj = SCRIPTS_LIST.find((s) => s.code === settingsObj.script);
    const recitationObj = RECITATIONS_LIST.find((r) => r.id === Number(settingsObj.recitation));

    if (scriptObj) setSelectedScript(scriptObj);
    if (recitationObj) setSelectedRecitation(recitationObj);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
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
