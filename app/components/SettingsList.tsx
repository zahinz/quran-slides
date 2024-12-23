'use client';

import { FormEvent } from 'react';
import { ScriptItem } from '../models';
import { useSettings } from '../providers/client/SettingsCtxProvider';
import { SCRIPTS_LIST } from '../services/lib';
import QsButton from './QsButton';
import QsListbox from './QsListbox';

const SettingsList = () => {
  const { selectedScript, setSelectedScript } = useSettings();

  const saveSettings = (e: FormEvent) => {
    e.preventDefault();

    document.cookie = `settings={"script": "${selectedScript?.code}"}; path=/`;

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