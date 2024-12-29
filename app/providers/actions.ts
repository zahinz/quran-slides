'use server';

import { QuranVerse, Script } from '../services/models';
import { getQuranVersesByType } from '../services/api';

export const fetchVerses = async (
  scriptType: Script
): Promise<QuranVerse[]> => {
  const res = await getQuranVersesByType(scriptType);
  return res?.verses || [];
};
