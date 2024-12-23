import { Language, LanguageItem, LanguageObj, ScriptItem } from '../../models';

export const BASE_URL = 'https://api.quran.com/api/v4';
export const RECITATION_ID = 2;
export const VERSES_AUDIO_URL = 'https://verses.quran.com';

export const LANGUAGES_OBJ: LanguageObj = {
	en: {
		language_name: 'English 🇬🇧',
		resource_id: 131
	},
	ms: {
		language_name: 'Malay 🇲🇾',
		resource_id: 39
	},
	id: {
		language_name: 'Indonesian 🇮🇩',
		resource_id: 33
	},
	fr: {
		language_name: 'French 🇫🇷',
		resource_id: 136
	},
	es: {
		language_name: 'Spanish 🇪🇸',
		resource_id: 140
	},
	ko: {
		language_name: 'Korean 🇰🇷',
		resource_id: 36
	},
	tr: {
		language_name: 'Turkish 🇹🇷',
		resource_id: 77
	}
}

export const LANGUAGES_LIST: LanguageItem[] = Object.entries(LANGUAGES_OBJ).map(([code, details]) => ({
	iso_code: code as Language,
	...details,
}));

export const SCRIPTS_LIST: ScriptItem[] = [
	{
		code: 'imlaei',
		script_name: 'Imlaei',
		script_text_key: 'text_imlaei'
	},
	{
		code: 'indopak',
		script_name: 'Indopak',
		script_text_key: 'text_indopak'
	},
	{
		code: 'uthmani',
		script_name: 'Uthmani',
		script_text_key: 'text_uthmani'
	},
	{
		code: 'uthmani_simple',
		script_name: 'Uthmani simple',
		script_text_key: 'text_uthmani_simple'
	},
	{
		code: 'uthmani_tajweed',
		script_name: 'Uthmani tajweed',
		script_text_key: 'text_uthmani_tajweed'
	}
];