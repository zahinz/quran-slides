'use client';

import { FormEvent } from 'react';
import {
  LanguageItem,
  Recitation,
  ScriptItem,
  SettingsObj
} from '../services/models';
import { useSettings } from '../providers/client/SettingsCtxProvider';
import {
  LANGUAGES_LIST,
  RECITATIONS_LIST,
  SCRIPTS_LIST
} from '../services/lib';
import QsButton from './QsButton';
import QsListbox from './QsListbox';
import { useTranslation } from '../i18n/client';

const SettingsList = () => {
  const { t } = useTranslation();

  const {
    selectedScript,
    setSelectedScript,
    selectedRecitation,
    setSelectedRecitation,
    selectedLng,
    setSelectedLng
  } = useSettings();

  const saveSettings = (e: FormEvent) => {
    e.preventDefault();

    const settingsObj: SettingsObj = {
      script: selectedScript.code,
      recitation: selectedRecitation.id,
      language: selectedLng.iso_code
    };

    document.cookie = `settings=${JSON.stringify(settingsObj)}; path=/`;
    window.location.assign('/');
  };

  return (
    <form
      className="flex flex-col gap-lg py-lg w-full sm:w-[50%]"
      onSubmit={saveSettings}
    >
      <QsListbox
        label={t('language')}
        items={LANGUAGES_LIST}
        value={selectedLng}
        onChange={setSelectedLng}
        renderValue={(value: LanguageItem) =>
          `${t(value.language_name)} ${value.flag}`
        }
        renderOptionItem={(item: LanguageItem) =>
          `${t(item.language_name)} ${item.flag}`
        }
      />
      <QsListbox
        label={t('verse_script')}
        items={SCRIPTS_LIST}
        value={selectedScript}
        onChange={setSelectedScript}
        renderValue={(value: ScriptItem) => value.script_name}
        renderOptionItem={(item: ScriptItem) => item.script_name}
      />
      <QsListbox
        label={t('recitation_audio')}
        items={RECITATIONS_LIST}
        value={selectedRecitation}
        onChange={setSelectedRecitation}
        renderValue={(value: Recitation) =>
          `${value.reciter_name}${value.style ? ` (${value.style})` : ''}`
        }
        renderOptionItem={(item: Recitation) =>
          `${item.reciter_name}${item.style ? ` (${item.style})` : ''}`
        }
      />
      <QsButton type={'submit'} className="text-center mt-lg">
        <span className="text-center w-full">{t('save')}</span>
      </QsButton>
    </form>
  );
};

export default SettingsList;
