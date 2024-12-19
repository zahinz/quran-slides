import { GetQuranChaptersResponse, GetQuranVerseByKeyResponse, GetQuranVersesByTypeResponse, VerseType } from '../../models';

const BASE_URL = 'https://api.quran.com/api/v4';

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