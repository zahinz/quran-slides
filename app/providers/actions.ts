'use server';

import { QuranVerse } from '../models';
import { getQuranVersesByType } from '../services/api';

export const fetchVerses = async (): Promise<QuranVerse[]> => {
  const res = await getQuranVersesByType('uthmani');    
  return res?.verses || [];
};