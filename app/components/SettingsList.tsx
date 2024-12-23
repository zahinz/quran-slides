'use client';

import { FormEvent } from 'react';
import { Recitation, ScriptItem } from '../services/models';
import { useSettings } from '../providers/client/SettingsCtxProvider';
import { RECITATIONS_LIST, SCRIPTS_LIST } from '../services/lib';
import QsButton from './QsButton';
import QsListbox from './QsListbox';

const SettingsList = () => {
  const { selectedScript, setSelectedScript, selectedRecitation, setSelectedRecitation } = useSettings();

  const saveSettings = (e: FormEvent) => {
    e.preventDefault();

    document.cookie = `settings={"script":"${selectedScript.code}","recitation":"${selectedRecitation.id}"}; path=/`;

    window.location.assign('/');
  }

  return (
    <form
      className="flex flex-col gap-lg py-lg w-full sm:w-[50%]"
      onSubmit={saveSettings}
    >
      <QsListbox
        label={'Script'}
        items={SCRIPTS_LIST}
        value={selectedScript}
        onChange={setSelectedScript}
        renderValue={(value: ScriptItem) => value.script_name}
        renderOptionItem={(item: ScriptItem) => item.script_name}
      />
      <QsListbox
        label={'Recitation audio'}
        items={RECITATIONS_LIST}
        value={selectedRecitation}
        onChange={setSelectedRecitation}
        renderValue={(value: Recitation) => `${value.reciter_name}${value.style ? ` (${value.style})`: ''}`}
        renderOptionItem={(item: Recitation) => `${item.reciter_name}${item.style ? ` (${item.style})`: ''}`}
      />
      <QsButton
        type={'submit'}
        className="text-center mt-lg"
      >
			  <span className="text-center w-full">Save</span>
      </QsButton>
    </form>
  );
}

export default SettingsList;