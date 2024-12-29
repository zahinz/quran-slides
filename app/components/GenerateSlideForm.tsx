'use client';

import { FormEvent, useEffect, useState } from 'react';
import SelectChapter from './SelectChapter';
import { QuranChapter } from '../services/models';
import QsListbox from './QsListbox';
import { useRouter } from 'next/navigation';
import QsButton from './QsButton';
import { useTranslation } from '../i18n/client';

const GenerateSlideForm = (): React.JSX.Element => {
  const { t } = useTranslation();

  const [selectedChapter, setSelectedChapter] = useState<QuranChapter | null>(
    null
  );
  const [fromVersesList, setFromVersesList] = useState<number[]>([]);
  const [toVersesList, setToVersesList] = useState<number[]>([]);
  const [fromVerse, setFromVerse] = useState<number>(0);
  const [toVerse, setToVerse] = useState<number>(0);

  const router = useRouter();

  const createRange = (n1: number, n2: number): number[] => {
    return Array.from({ length: n2 - n1 + 1 }, (_, i) => n1 + i);
  };

  const generateSlides = (e: FormEvent) => {
    e.preventDefault();
    if (selectedChapter) {
      router.push(
        `display-slides?chapter_id=${selectedChapter.id}&verse_from=${fromVerse}&verse_to=${toVerse}`
      );
    }
  };

  useEffect(() => {
    if (selectedChapter) {
      setFromVerse(0);
      setToVerse(0);
      setFromVersesList(createRange(1, selectedChapter.verses_count));
      setToVersesList(createRange(1, selectedChapter.verses_count));
    }
  }, [selectedChapter]);

  useEffect(() => {
    if (fromVerse) {
      setToVersesList(
        createRange(fromVerse, toVersesList[toVersesList.length - 1])
      );

      if (fromVerse === toVersesList[toVersesList.length - 1]) {
        setToVerse(fromVerse);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromVerse]);

  useEffect(() => {
    if (toVerse) {
      setFromVersesList(createRange(1, toVerse));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toVerse]);

  return (
    <form
      onSubmit={(e: FormEvent) => generateSlides(e)}
      className="w-full md:w-[50vw] py-3xl"
    >
      <SelectChapter
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
      />
      {selectedChapter ? (
        <>
          <div className="flex flex-col sm:flex-row py-lg gap-lg">
            <QsListbox
              label={t('from_verse')}
              items={fromVersesList}
              value={fromVerse}
              onChange={setFromVerse}
              renderValue={(value) => (value > 0 ? value : '')}
            />
            <QsListbox
              label={t('to_verse')}
              items={toVersesList}
              value={toVerse}
              onChange={setToVerse}
              renderValue={(value) => (value > 0 ? value : '')}
            />
          </div>
          <QsButton
            type={'submit'}
            className="mt-lg w-full"
            disabled={!fromVerse || !toVerse}
          >
            <span className="text-center w-full">{t('generate')}</span>
          </QsButton>
        </>
      ) : null}
    </form>
  );
};

export default GenerateSlideForm;
