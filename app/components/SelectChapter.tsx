'use client';

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { QuranChapter } from '../models';
import { ChangeEvent, useState } from 'react';
import { getQuranChapters } from '../services/api';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface SelectChapterProps {
	selectedChapter: QuranChapter | null;
	setSelectedChapter: (chapter: QuranChapter) => void;
};

const SelectChapter = ({ selectedChapter, setSelectedChapter }: SelectChapterProps): React.JSX.Element => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [chapters, setChapters] = useState<QuranChapter[]>([]);

	const filteredChapters: QuranChapter[] =
		searchQuery === '' ? chapters : chapters.filter((chapter) => {
			return chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
		});

	const fetchChapters = async () => {
		const res = await getQuranChapters();
		setChapters(res?.chapters || []);
	};

	return (
		<Combobox
			value={selectedChapter}
			onChange={setSelectedChapter}
			onClose={() => setSearchQuery('')}
			immediate
		>
			<div
				className="relative"
				onClick={() => chapters.length === 0 ? fetchChapters() : null}
			>
				<ComboboxInput
					className="w-full rounded-lg border-none bg-white dark:bg-gray-800 py-lg pl-lg pr-4xl focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-300 dark:data-[focus]:outline-gray-600"
					displayValue={(chapter: QuranChapter) => chapter ? `${chapter.name_simple} (${chapter.name_arabic})` : ''}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
					placeholder={'Search chapter (surah) here'}
					autoComplete={'off'}
				/>
				<ComboboxButton className="absolute top-lg right-lg">
					<ChevronDownIcon className="h-2xl w-2xl" />
				</ComboboxButton>
			</div>
      <ComboboxOptions
				anchor={'bottom'}
				transition
				className="w-[var(--input-width)] rounded-xl border bg-white dark:bg-gray-800 border-white dark:border-gray-800 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
			>
        {filteredChapters.map((chapter) => (
          <ComboboxOption
						key={chapter.id}
						value={chapter}
						className="group flex items-center p-lg select-none data-[focus]:bg-gray-300 dark:data-[focus]:bg-gray-900 cursor-pointer"
					>
						<CheckCircleIcon className="invisible group-data-[selected]:visible h-2xl w-2xl mr-lg text-green-400" />
            <div>{`${chapter.name_simple} (${chapter.name_arabic})`}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
		</Combobox>
	);
}

export default SelectChapter;