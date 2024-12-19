'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { QuranVerse } from '../models';
import { getQuranVersesByType } from '../services/api';

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

const VersesProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [verses, setVerses] = useState<QuranVerse[]>([]);

	const fetchVerses = async () => {
		const res = await getQuranVersesByType('uthmani');    
		setVerses(res?.verses || []);
    setLoading(false);
	};
	
	useEffect(() => {
		fetchVerses();
	}, []);

  if (isLoading) {
		return <div>Loading...</div>
	}

  return (
    <VersesContext.Provider
      value={{ verses: verses }}
    >
      {children}
    </VersesContext.Provider>
  );
}

export default VersesProvider;
