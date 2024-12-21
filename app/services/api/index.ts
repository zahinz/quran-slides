import { GetQuranChaptersResponse, GetQuranVerseByKeyResponse, GetQuranVersesByTypeResponse, GetQuranTranslationResponse, VerseType, GetQuranVerseRecitationResponse, Language } from '../../models';
import { BASE_URL, LANGUAGES_OBJ, RECITATION_ID } from '../lib';

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
		const response = await fetch(`${BASE_URL}/quran/translations/${LANGUAGES_OBJ[language].resource_id}?verse_key=${verseKey}`);

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
		const response = await fetch(`${BASE_URL}/quran/translations/${LANGUAGES_OBJ[language].resource_id}?chapter_number=${chapterId}`);

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