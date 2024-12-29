import { Button, ButtonProps } from '@headlessui/react';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface QsButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const QsButton = ({
  children,
  onClick,
  className,
  isLoading,
  disabled,
  ...rest
}: QsButtonProps) => {
  const baseClasses =
    'inline-flex rounded-md bg-primary-main px-lg py-xs text-center text-white data-[hover]:bg-primary-hover data-[disabled]:opacity-30';

  return (
    <Button
      className={twMerge(baseClasses, className as ClassNameValue)}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default QsButton;
