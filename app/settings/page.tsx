import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import SettingsList from '../components/SettingsList';
import { getTranslation } from '../i18n';

const SettingsPage = async (): Promise<React.JSX.Element> => {
  const { t } = await getTranslation();

	return (
		<div className="flex flex-col justify-center items-center">
      <div className="flex items-center text-xl sm:text-2xl font-semibold gap-xs">
        <Cog6ToothIcon className="h-xl w-xl sm:h-2xl sm:w-2xl" />
        {t('settings')}
      </div>
      <SettingsList />
    </div>
	);
}

export default SettingsPage;