import { Language, LanguageItem, LanguageObj, Recitation, ScriptItem } from '../../models';

export const BASE_URL = 'https://api.quran.com/api/v4';
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

// https://api.quran.com/api/v4/resources/recitations
export const RECITATIONS_LIST: Recitation[] = [
	{
    id: 1,
    reciter_name: 'AbdulBaset AbdulSamad',
    style: 'Mujawwad',
    translated_name: {
      name: 'AbdulBaset AbdulSamad',
      language_name: 'english'
    }
  },
	{
    id: 2,
    reciter_name: 'AbdulBaset AbdulSamad',
    style: 'Murattal',
    translated_name: {
      name: 'AbdulBaset AbdulSamad',
      language_name: 'english'
    }
  },
  {
    id: 3,
    reciter_name: 'Abdur-Rahman as-Sudais',
    translated_name: {
      name: 'Abdur-Rahman as-Sudais',
      language_name: 'english'
    }
  },
  {
    id: 4,
    reciter_name: 'Abu Bakr al-Shatri',
    translated_name: {
      name: 'Abu Bakr al-Shatri',
      language_name: 'english'
    }
  },
  {
    id: 5,
    reciter_name: 'Hani ar-Rifai',
    translated_name: {
      name: 'Hani ar-Rifai',
      language_name: 'english'
    }
  },
  {
    id: 12,
    reciter_name: 'Mahmoud Khalil Al-Husary',
    style: 'Muallim',
    translated_name: {
      name: 'Mahmoud Khalil Al-Husary',
      language_name: 'english'
    }
  },
  {
    id: 6,
    reciter_name: 'Mahmoud Khalil Al-Husary',
    translated_name: {
      name: 'Mahmoud Khalil Al-Husary',
      language_name: 'english'
    }
  },
  {
    id: 7,
    reciter_name: 'Mishari Rashid al-`Afasy',
    translated_name: {
      name: 'Mishari Rashid al-`Afasy',
      language_name: 'english'
    }
  },
  {
    id: 9,
    reciter_name: 'Mohamed Siddiq al-Minshawi',
    style: 'Murattal',
    translated_name: {
      name: 'Mohamed Siddiq al-Minshawi',
      language_name: 'english'
    }
  },
  {
    id: 8,
    reciter_name: 'Mohamed Siddiq al-Minshawi',
    style: 'Mujawwad',
    translated_name: {
      name: 'Mohamed Siddiq al-Minshawi',
      language_name: 'english'
    }
  },
  {
    id: 10,
    reciter_name: 'Sa`ud ash-Shuraym',
    translated_name: {
      name: 'Sa`ud ash-Shuraym',
      language_name: 'english'
    }
  },
  {
    id: 11,
    reciter_name: 'Mohamed al-Tablawi',
    translated_name: {
      name: 'Mohamed al-Tablawi',
      language_name: 'english'
    }
  }
];