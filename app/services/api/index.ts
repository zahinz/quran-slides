import { GetQuranChaptersResponse, GetQuranVerseByKeyResponse, GetQuranVersesByTypeResponse, GetQuranTranslationResponse, VerseType, GetQuranVerseRecitationResponse, Language } from '../../models';

const BASE_URL = 'https://api.quran.com/api/v4';
const TRANSLATIONS_RESOURCE_ID = {
	en: 131,
	ms: 39
};
const RECITATION_ID = 2;
export const VERSES_AUDIO_URL = 'https://verses.quran.com';

export const getQuranVersesByType = async (type: VerseType): Promise<GetQuranVersesByTypeResponse | null> => {
	try {
		const response = await fetch(`${BASE_URL}/quran/verses/${type}`);

		if (!response.ok) {
			return null;
		}

		const responseJson = await response.json();
		return responseJson;

	} catch (e) {
		throw e;
	}
};

export const getQuranChapters = async (): Promise<GetQuranChaptersResponse | null> => {
	try {
		const response = await fetch(`${BASE_URL}/chapters?language=en`);

		if (!response.ok) {
			return null;
		}

		const responseJson = await response.json();
		return responseJson;

	} catch (e) {
		throw e;
	}
};

export const getQuranVerseByKey = async (chapterId: number, verseId: number = 1): Promise<GetQuranVerseByKeyResponse | null> => {
	try {
		const response = await fetch(`${BASE_URL}/verses/by_key/${chapterId}:${verseId}`);

		if (!response.ok) {
			return null;
		}

		const responseJson = await response.json();
		return responseJson;

	} catch (e) {
		throw e;
	}
};

export const getQuranVerseTranslation = async (verseKey: string, language: Language = 'en'): Promise<GetQuranTranslationResponse | null> => {
	try {
		const response = await fetch(`${BASE_URL}/quran/translations/${TRANSLATIONS_RESOURCE_ID[language]}?verse_key=${verseKey}`);

		if (!response.ok) {
			return null;
		}

		const responseJson = await response.json();
		return responseJson;

	} catch (e) {
		throw e;
	}
}

export const getQuranChapterTranslation = async (chapterId: number, language: Language = 'en'): Promise<GetQuranTranslationResponse | null> => {
	try {
		const response = await fetch(`${BASE_URL}/quran/translations/${TRANSLATIONS_RESOURCE_ID[language]}?chapter_number=${chapterId}`);

		if (!response.ok) {
			return null;
		}

		const responseJson = await response.json();
		return responseJson;

	} catch (e) {
		throw e;
	}
}

export const getQuranVerseRecitation = async (verseKey: string): Promise<GetQuranVerseRecitationResponse | null> => {
	try {
		const response = await fetch(`${BASE_URL}/recitations/${RECITATION_ID}/by_ayah/${verseKey}`);

		if (!response.ok) {
			return null;
		}

		const responseJson = await response.json();
		return responseJson;

	} catch (e) {
		throw e;
	}
}