import { LANGUAGES_OBJ } from '../services/lib';
import { Language } from '../services/models';

export const fallbackLng: Language = 'en';
export const languages: Language[] = Object.keys(LANGUAGES_OBJ) as Language[];
