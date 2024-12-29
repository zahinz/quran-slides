'use client';

import Image from 'next/image';
import Link from 'next/link';
import QsLogo from '../../public/assets/logo.png';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center flex-none bg-background py-xl relative">
      <Link href={'/'} className="block w-[60%] sm:w-[21.875rem]">
        <Image
          src={QsLogo}
          alt="QuranSlides"
          className="mx-auto rounded-md"
          priority
        />
      </Link>
      {pathname !== '/settings' ? (
        <Link
          href={'/settings'}
          className="absolute top-lg right-lg text-primary-main dark:text-secondary-main cursor-pointer"
        >
          <Cog6ToothIcon className="h-2xl w-2xl" />
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
