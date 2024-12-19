import { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import QsLogo from '../public/assets/logo.png';
import { Poppins } from 'next/font/google';
import VersesProvider from './providers/VersesProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'QuranSlides',
  description: 'Interactive platform to display Quranic verses in slide format, ideal for presentations, study, and recitation.',
  icons: {
    icon: '/assets/logo-2.png'
  }
};

const RootLayout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <VersesProvider>
          <main className="p-xl">
            <Link href={'/'}>
              <Image
                src={QsLogo}
                alt="QuranSlides"
                width={350}
                className="mx-auto rounded-md"
              />
            </Link>
            {children}
          </main>
        </VersesProvider>
      </body>
    </html>
  );
}

export default RootLayout;