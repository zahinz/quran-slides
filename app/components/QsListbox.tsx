import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface QsListboxProps {
  value: any | null;
  onChange: (value: any) => void;
  renderValue?: (value: any) => React.ReactNode;
  items: any[];
  renderOptionItem?: (item: any) => React.ReactNode;
  label?: string;
  containerClassName?: ClassNameValue;
  buttonClassName?: ClassNameValue;
  iconClassName?: ClassNameValue;
}

const QsListbox = ({
  value,
  onChange,
  renderValue = (value) => value,
  items,
  renderOptionItem = (value) => value,
  label,
  containerClassName,
  buttonClassName,
  iconClassName
}: QsListboxProps): React.JSX.Element => {
  return (
    <div className={twMerge('w-full', containerClassName)}>
      {label ? <div className="mb-xs">{label}</div> : null}
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={twMerge(
            'relative w-full rounded-lg border-none bg-white dark:bg-gray-800 py-lg pl-lg pr-4xl focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-300 dark:data-[focus]:outline-gray-600',
            buttonClassName
          )}
        >
          {renderValue(value) || <span className="opacity-0">Placeholder</span>}
          <ChevronDownIcon
            className={twMerge(
              'absolute top-lg right-lg h-2xl w-2xl',
              iconClassName
            )}
          />
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
              className="group flex items-center p-lg select-none data-[focus]:bg-gray-300 dark:data-[focus]:bg-gray-900 cursor-pointer"
            >
              <CheckCircleIcon className="invisible group-data-[selected]:visible h-lg w-lg mr-lg text-green-400" />
              {renderOptionItem(item)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default QsListbox;
