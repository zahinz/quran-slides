import { GetQuranVerseByKeyResponse } from '../models';
import { getQuranVerseByKey } from '../services/api';

export const fetchQuranVerseByKey = async (chapterId: number, verseId: number): Promise<GetQuranVerseByKeyResponse | null> => {
	return await getQuranVerseByKey(chapterId, verseId);
};

