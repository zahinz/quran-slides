'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface QsListboxProps {
	value: any | null;
	onChange: (value: any) => void;
	renderValue?: (value: any) => React.ReactNode;
	items: any[];
	renderOptionItem?: (item: any) => React.ReactNode;
	label?: string;
};

const QsListbox = ({
	value,
	onChange,
	renderValue = (value) => value,
	items,
	renderOptionItem = (value) => value,
	label
}: QsListboxProps): React.JSX.Element => {
	return (
		<div className="w-full">
			{label ? <div className="mb-xs">{label}</div> : null }
			<Listbox
				value={value}
				onChange={onChange}
			>
				<ListboxButton
					className="relative w-full rounded-lg border-none bg-white dark:bg-gray-800 py-lg pl-lg pr-4xl focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-300 dark:data-[focus]:outline-gray-600"
				>
					{renderValue(value) || <span className="opacity-0">Placeholder</span>}
					<ChevronDownIcon className="absolute top-lg right-lg h-2xl w-2xl" />
				</ListboxButton>
				<ListboxOptions
					anchor={'bottom'}
					transition
					className="w-[var(--button-width)] rounded-xl border border-white dark:border-gray-800 bg-white dark:bg-gray-800 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
				>
					{items.map((item, key) => (
						<ListboxOption
							key={key}
							value={item}
							className="p-lg select-none data-[focus]:bg-gray-300 dark:data-[focus]:bg-gray-900 cursor-pointer"
						>
							{renderOptionItem(item)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Listbox>
		</div>
	);
}

export default QsListbox;