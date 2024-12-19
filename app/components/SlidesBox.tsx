'use client';

import { useEffect, useState } from 'react';
import { useVerses } from '../providers/VersesProvider';
import { QuranVerse } from '../models';
import useEmblaCarousel from 'embla-carousel-react';

interface SlidesBoxProps {
	chapterId: number;
	verseFrom: number;
	verseTo: number;
};

const SlidesBox = ({ chapterId, verseFrom, verseTo }: SlidesBoxProps): React.JSX.Element => {
	const { verses } = useVerses();

	const [filteredVerses, setFilteredVerses] = useState<QuranVerse[]>([]); 
	
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

	return (
		<div className="w-full overflow-auto">
			<div className="flex"> 
				{filteredVerses.map((verse, idx) => (
					<div key={idx} className="text-6xl flex-none w-full min-w-0 text-center p-6xl leading-loose">
						{verse.text_uthmani} {`(${verse.verse_key})`}
					</div>
				))}
			</div>
		</div>
	);
}

export default SlidesBox;