'use client';

import { useEffect, useRef, useState } from 'react';
import { useVerses } from '../providers/VersesProvider';
import { QuranVerse } from '../models';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { getQuranChapterTranslation, getQuranVerseRecitation, VERSES_AUDIO_URL } from '../services/api';
import DOMPurify from 'dompurify';
import QsButton from './QsButton';

interface SlidesBoxProps {
	chapterId: number;
	verseFrom: number;
	verseTo: number;
};

const SlidesBox = ({ chapterId, verseFrom, verseTo }: SlidesBoxProps): React.JSX.Element => {
	const { verses } = useVerses();

	const [filteredVerses, setFilteredVerses] = useState<QuranVerse[]>([]);
	const [_, setDisplayedSlideIndex] = useState<number>(0);
	const [showNavButtons, setShowNavButtons] = useState<boolean>(false);
	const [loadingAudios, setLoadingAudios] = useState<number[]>([]);

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
	}, [chapterId, verseFrom, verseTo]);

	const fetchVersesTranslation = async (chapterId: number, verseFrom: number, verseTo: number) => {
		const res = await getQuranChapterTranslation(chapterId);
		if (res) {
			const filteredTranslations = res.translations.slice(verseFrom - 1, verseTo);
			setFilteredVerses((prevFiltered) => {
				return prevFiltered.map((v, i) => ({ ...v, translation: filteredTranslations[i] }));
			});
		}
	}

	const fetchVerseAudio = async (verseKey: string, index: number) => {
		setLoadingAudios((prevAudios) => {
			prevAudios.push(index);
			return prevAudios;
		});
		const res = await getQuranVerseRecitation(verseKey);
		if (res) {
			setFilteredVerses((prevFiltered) => {
				prevFiltered[index].audio = res.audio_files[0];
				return prevFiltered;
			});
		}
		setLoadingAudios((prevAudios) => {
			return prevAudios.filter(k => k !== index);
		});
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
		fetchVersesTranslation(chapterId, verseFrom, verseTo);

		document.addEventListener('keydown', handleArrowKeysEvent);
		return () => {
			document.removeEventListener('keydown', handleArrowKeysEvent);
		};
	}, []);

	return (
		<div
			className="w-full h-full overflow-auto scrollbar-hide"
			onMouseEnter={() => setShowNavButtons(true)}
      onMouseLeave={() => setShowNavButtons(false)}
		>
			<div className="flex items-start sm:overflow-hidden"> 
				{filteredVerses.map((verse, idx) => (
					<div
						key={idx}
						ref={(el) => (slideRefs.current[idx] = el)}
						className="text-3xl sm:text-6xl flex-none w-full min-w-0 text-center p-2xl sm:p-6xl leading-loose sm:leading-loose"
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
						<div className="pt-4xl flex items-center justify-center">
							{ verse.audio ?
								<audio
									controls
									autoPlay
								>
									<source src={`${VERSES_AUDIO_URL}/${verse.audio.url}`} />
								</audio>
							:
							<QsButton
								isLoading={loadingAudios.includes(idx)}
								onClick={() => fetchVerseAudio(verse.verse_key, idx)}
							>
								<span className="text-base">Recite</span>
							</QsButton>
							}
						</div>
					</div>
				))}
			</div>
			
			<div className={`${showNavButtons ? 'flex' : 'flex sm:hidden'} fixed bottom-0 left-0 gap-lg px-lg py-xs bg-primary-main bg-opacity-30 rounded-md w-full justify-end`}>
				<QsButton
					onClick={() => scrollSlide('left')}
				>
					<ChevronLeftIcon className="h-2xl w-2xl" />
				</QsButton>
				<QsButton
					onClick={() => scrollSlide('right')}
				>
					<ChevronRightIcon className="h-2xl w-2xl" />
				</QsButton>
			</div>
		</div>
	);
}

export default SlidesBox;