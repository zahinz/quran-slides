import { Button, ButtonProps } from '@headlessui/react';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const QsButton = ({ children, onClick, className }: ButtonProps) => {
  const baseClasses = 'inline-flex rounded-md bg-primary-main px-lg py-xs text-center data-[hover]:bg-primary-hover data-[disabled]:opacity-30';

  return (
		<Button
      className={twMerge(baseClasses, className as ClassNameValue)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default QsButton;