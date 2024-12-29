import { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import { SettingsProvider, VersesProvider } from './providers';
import Header from './components/Header';
import { dir } from 'i18next';
import { getSavedLanguage } from './i18n';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'QuranSlides',
  description:
    'Interactive platform to display Quranic verses in slide format, ideal for presentations, study, and recitation.',
  icons: {
    icon: '/assets/logo-2.png'
  }
};

export const dynamic = 'force-dynamic';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const lng = getSavedLanguage();

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${poppins.variable}`}>
        <SettingsProvider>
          <VersesProvider>
            <main className="h-screen flex flex-col">
              <Header />
              <div className="flex-grow max-h-full overflow-auto scrollbar-hide px-xl">
                {children}
              </div>
            </main>
          </VersesProvider>
        </SettingsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
