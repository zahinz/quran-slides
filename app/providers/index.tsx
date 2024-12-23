import { PropsWithChildren } from 'react';
import { QuranVerse, SettingsObj } from '../services/models';
import VersesCtxProvider from './client/VersesCtxProvider';
import SettingsCtxProvider from './client/SettingsCtxProvider';
import { fetchVerses } from './actions';
import { cookies } from 'next/headers';

export const SettingsProvider = async ({ children }: PropsWithChildren) => {
  return (
    <SettingsCtxProvider>
      {children}
    </SettingsCtxProvider>
  );
}

export const VersesProvider = async ({ children }: PropsWithChildren) => {
  const cookieStore = cookies();
  const settings = cookieStore.get('settings')?.value || '';
  const settingsObj: SettingsObj = settings ? JSON.parse(settings) : null; 

  const verses: QuranVerse[] = await fetchVerses(settingsObj?.script || 'uthmani');  

  return (
    <VersesCtxProvider verses={verses}>
      {children}
    </VersesCtxProvider>
  );
}