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
}

export interface GetQuranVerseByKeyResponse {
	verse: QuranVerse;
}

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
};

export interface Pagination {
	per_page: number;
  current_page: number;
  next_page: number;
  total_pages: number;
  total_records: number;
}

export interface GetQuranVersesByTypeResponse {
	verses: QuranVerse[];
	meta: {
		filters: any;
	}
};

export type VerseType = 'indopak' | 'uthmani' | 'uthmani_simple' | 'uthmani_tajweed' | 'imlaei';