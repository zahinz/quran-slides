import { PropsWithChildren } from 'react';
import { QuranVerse } from '../models';
import VersesCtxProvider from './VersesCtxProvider';
import { fetchVerses } from './actions';

export const VersesProvider = async ({ children }: PropsWithChildren) => {
  const verses: QuranVerse[] = await fetchVerses();

  return (
    <VersesCtxProvider verses={verses}>
      {children}
    </VersesCtxProvider>
  );
}