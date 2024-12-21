import { Language, LanguageItem, LanguageObj } from '../../models';

export const BASE_URL = 'https://api.quran.com/api/v4';
export const RECITATION_ID = 2;
export const VERSES_AUDIO_URL = 'https://verses.quran.com';

export const LANGUAGES_OBJ: LanguageObj = {
	en: {
		language_name: 'English',
		resource_id: 131
	},
	ms: {
		language_name: 'Malay',
		resource_id: 39
	}
}

export const LANGUAGES_LIST: LanguageItem[] = Object.entries(LANGUAGES_OBJ).map(([code, details]) => ({
	code: code as Language,
	...details,
}));