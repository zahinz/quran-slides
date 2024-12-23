'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ScriptItem, SettingsObj } from '../../models';
import { SCRIPTS_LIST } from '../../services/lib';
import { getCookie } from '../../services/lib/helpers';

type SettingsState = {
  selectedScript: ScriptItem;
  setSelectedScript: (script: ScriptItem) => void;
};

const SettingsContext = createContext<SettingsState>({
  selectedScript: SCRIPTS_LIST[2],
  setSelectedScript: () => {}
});

export const useSettings = (): SettingsState => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('Please use SettingsProvider in parent component');
  }

  return context;
};

const SettingsCtxProvider = ({ children }: PropsWithChildren) => {
  const [selectedScript, setSelectedScript] = useState<ScriptItem>(SCRIPTS_LIST[2]);

  useEffect(() => {
    const settings = getCookie('settings');
    const settingsObj: SettingsObj = settings ? JSON.parse(settings) : null;
    const scriptObj = SCRIPTS_LIST.find((s) => s.code === settingsObj.script);
    if (scriptObj) setSelectedScript(scriptObj);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        selectedScript,
        setSelectedScript
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsCtxProvider;
