'use client';

import { useEffect, useRef, useState } from 'react';
import { useVerses } from '../providers/VersesProvider';
import { QuranVerse } from '../models';
import { Button } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

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
	}, []);

	return (
		<div
			className="w-full overflow-hidden"
			onMouseEnter={() => setShowNavButtons(true)}
      onMouseLeave={() => setShowNavButtons(false)}
		>
			<div className="flex"> 
				{filteredVerses.map((verse, idx) => (
					<div
						key={idx}
						ref={(el) => (slideRefs.current[idx] = el)}
						className="text-6xl flex-none w-full min-w-0 text-center p-6xl leading-loose"
					>
						{verse.text_uthmani} {`(${verse.verse_key})`}
					</div>
				))}
			</div>
			<div id={'buttons'} className={`${showNavButtons ? 'flex' : 'hidden'} fixed bottom-lg gap-lg px-lg py-xs bg-primary-main bg-opacity-30 left-1/2 transform -translate-x-1/2 rounded-md`}>
				<Button
					className="inline-flex rounded-md bg-primary-main px-lg py-xs text-center data-[hover]:bg-primary-hover data-[disabled]:opacity-30"
					onClick={() => scrollSlide('left')}
				>
					<ChevronLeftIcon className="h-2xl w-2xl" />
				</Button>
				<Button
					className="inline-flex rounded-md bg-primary-main px-lg py-xs text-center data-[hover]:bg-primary-hover data-[disabled]:opacity-30"
					onClick={() => scrollSlide('right')}
				>
					<ChevronRightIcon className="h-2xl w-2xl" />
				</Button>
			</div>
		</div>
	);
}

export default SlidesBox;