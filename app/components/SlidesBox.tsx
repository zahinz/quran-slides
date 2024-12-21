'use client';

import { useEffect, useRef, useState } from 'react';
import { useVerses } from '../providers/VersesProvider';
import { Language, LanguageItem, QuranVerse } from '../models';
import { getQuranChapterTranslation, getQuranVerseRecitation } from '../services/api';
import DOMPurify from 'dompurify';
import SlideControls from './SlideControls';
import { LANGUAGES_LIST, VERSES_AUDIO_URL } from '../services/lib';

interface SlidesBoxProps {
	chapterId: number;
	verseFrom: number;
	verseTo: number;
};

const SlidesBox = ({ chapterId, verseFrom, verseTo }: SlidesBoxProps): React.JSX.Element => {
	const { verses } = useVerses();

	const [filteredVerses, setFilteredVerses] = useState<QuranVerse[]>([]);
	const [displayedSlideIndex, setDisplayedSlideIndex] = useState<number>(0);
	const [isLoadingAudio, setLoadingAudio] = useState<boolean>(false);
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem>(LANGUAGES_LIST[0]);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const slideRefs = useRef<HTMLDivElement[] | null[]>([]);
	
	const filterVerses = (chapterId: number, verseFrom: number, verseTo: number) => {
		if (verseFrom > verseTo) {
			alert('Selection error - The last verse number must be less than or equal to the first verse number.');
			return;
		}

		const chapterIdentifier = `${chapterId}:`;

		const filtered = [...verses].filter((verse) => verse.verse_key.startsWith(chapterIdentifier)).filter((verse2) => {
			const verseNumber = Number(verse2.verse_key.replace(chapterIdentifier, ''));
			return verseNumber >= verseFrom && verseNumber <= verseTo;
		});

		setFilteredVerses(filtered);
	}

	useEffect(() => {
		filterVerses(chapterId, verseFrom, verseTo);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chapterId, verseFrom, verseTo]);

	const fetchVersesTranslation = async (chapterId: number, verseFrom: number, verseTo: number, language: Language) => {
		const res = await getQuranChapterTranslation(chapterId, language);
		if (res) {
			const filteredTranslations = res.translations.slice(verseFrom - 1, verseTo);
			setFilteredVerses((prevFiltered) => {
				return prevFiltered.map((v, i) => ({ ...v, translation: filteredTranslations[i] }));
			});
		}
	}

	const fetchVerseAudio = async (verseKey: string, index: number) => {
		setLoadingAudio(true);
		const res = await getQuranVerseRecitation(verseKey);
		if (res) {
			setFilteredVerses((prevFiltered) => {
				prevFiltered[index].audio = { ...res.audio_files[0], url: `${VERSES_AUDIO_URL}/${res.audio_files[0].url}` };
				return prevFiltered;
			});
		}
		setLoadingAudio(false);
	}

	const scrollSlide = (direction: string) => {
		setDisplayedSlideIndex((prevIndex) => {
			const newSlide = direction === 'right' ? prevIndex + 1 : prevIndex - 1;
			if (slideRefs.current[newSlide]) {
				slideRefs.current[newSlide].scrollIntoView({ behavior: 'smooth' });
				return newSlide;
			}
			return prevIndex;
		});
	}

	const handleArrowKeysEvent = (e: KeyboardEvent) => {
		e.preventDefault();
		switch (e.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				scrollSlide('left');
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				scrollSlide('right');
			default:
				break;
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleArrowKeysEvent);
		return () => {
			document.removeEventListener('keydown', handleArrowKeysEvent);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (selectedLanguage) {			
			fetchVersesTranslation(chapterId, verseFrom, verseTo, selectedLanguage.iso_code);			
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedLanguage]); 

	return (
		<div
			ref={containerRef}
			className="w-full h-full overflow-auto scrollbar-hide bg-background"
		>
			<div className="flex items-start sm:overflow-hidden"> 
				{filteredVerses.map((verse, idx) => (
					<div
						key={idx}
						ref={(el) => (slideRefs.current[idx] = el)}
						className="text-3xl sm:text-6xl flex-none w-full min-w-0 text-center px-2xl pt-2xl pb-10xl sm:p-6xl leading-loose sm:leading-loose"
					>
						<div>{verse.text_uthmani} {`(${verse.verse_key})`}</div>
						<div className="text-2xl leading-normal pt-2xl">
							<span
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(verse.translation?.text)
								}}
							/>
							<span>{` (${verse.verse_key})`}</span>
						</div>
					</div>
				))}
			</div>

			<SlideControls
				containerRef={containerRef}
				onClickLeft={() => scrollSlide('left')}
				onClickRight={() => scrollSlide('right')}
				slideAudio={filteredVerses[displayedSlideIndex]?.audio}
				onClickAudio={() => fetchVerseAudio(filteredVerses[displayedSlideIndex]?.verse_key, displayedSlideIndex)}
				isLoadingAudio={isLoadingAudio}
				selectedLanguage={selectedLanguage}
				onChangeLanguage={(lng) => setSelectedLanguage(lng)}
			/>
		</div>
	);
}

export default SlidesBox;