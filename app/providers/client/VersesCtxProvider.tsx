'use client';

import { PropsWithChildren, createContext, useContext } from 'react';
import { QuranVerse } from '../../services/models';

type VersesState = {
  verses: QuranVerse[];
};

const VersesContext = createContext<VersesState>({
  verses: []
});

export const useVerses = (): VersesState => {
  const context = useContext(VersesContext);

  if (!context) {
    throw new Error('Please use VersesProvider in parent component');
  }

  return context;
};

interface VersesCtxProviderProps extends PropsWithChildren {
  verses: QuranVerse[];
}

const VersesCtxProvider = ({ children, verses }: VersesCtxProviderProps) => {
  return (
    <VersesContext.Provider value={{ verses }}>
      {children}
    </VersesContext.Provider>
  );
};

export default VersesCtxProvider;
