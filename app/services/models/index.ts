export interface GetQuranChaptersResponse {
	chapters: QuranChapter[];
};

export interface QuranChapter {
	id: number;
	chapter_number: number;
	bismillah_pre: boolean;
	revelation_order: number;
	revelation_place: string;
	name_complex: string;
	name_arabic: string;
	name_simple: string;
	verses_count: number;
	pages: Array<number>;
};

export interface GetQuranVersesResponse {
	verses: QuranVerse[];
	pagination: Pagination;
};

export interface GetQuranVerseByKeyResponse {
	verse: QuranVerse;
};

export interface GetQuranTranslationResponse {
	translations: Translation[];
	meta: Meta;
};

export interface GetQuranVersesByTypeResponse {
	verses: QuranVerse[];
	meta: Meta;
};

export interface GetQuranRecitationsResponse {
	recitations: Recitation[];
}

export interface GetQuranVerseRecitationResponse {
	audio_files: Audio[];
	pagination: Pagination;
};

export interface QuranVerse {
	id: number;
	chapter_id: number;
	verse_number: number;
	verse_key: string;
	verse_index: number;
	text_uthmani: string;
	text_uthmani_simple: string;
	text_imlaei: string;
	text_imlaei_simple: string;
	text_indopak: string;
	text_uthmani_tajweed: string;
	juz_number: number;
	hizb_number: number;
	rub_number: number;
	sajdah_type: null;
	sajdah_number: null;
	page_number: number;
	image_url: string;
	image_width: number;
	words: QuranWord[];
	translation: Translation;
	audio: Audio;
};

export interface QuranWord {
	id: number;
	position: number;
	audio_url: string;
	char_type_name: string;
	translation: Translation;
	transliteration: Translation;
};

export interface Translation {
	text: string;
	language_name: string;
	resource_id: number;
};

export interface Audio {
	verse_key: string;
	url: string;
};

export interface Pagination {
	per_page: number;
  current_page: number;
  next_page: number;
  total_pages: number;
  total_records: number;
};

interface Meta {
	filters: any;
	translation_name: string;
  author_name: string;
};

export type Script = 'indopak' | 'uthmani' | 'uthmani_simple' | 'uthmani_tajweed' | 'imlaei';

export interface ScriptItem {
	code: Script;
	script_name: string;
	script_text_key: string;
};

export type Language = 'en' | 'ms' | 'fr' | 'es' | 'id' | 'ko' | 'tr';

type LanguageDetails = {
  resource_id: number;
  language_name: string;
	flag: string;
};

export type LanguageObj = Record<Language, LanguageDetails>;

export interface LanguageItem extends LanguageDetails {
	iso_code: Language
};

export interface Recitation {
	id: number;
	reciter_name: string;
	style?: string;
	translated_name: {
		name: string;
		language_name: string;
	}
};

export interface SettingsObj {
	script: Script;
	recitation: number;
	language: Language;
}