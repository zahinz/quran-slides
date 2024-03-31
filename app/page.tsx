'use client';

import { useEffect, useState } from 'react';

type ApiQuranChapter = {
  id: number;
  chapter_number: number;
  bismillah_pre: boolean;
  revelation_order: number;
  revelation_place: string;
  name_complex: string;
  name_arabic: string;
  name_simple: string;
  verses_count: number;
  pages: Array<number>;
};

const Home = () => {
  const [chapters, setChapters] = useState<ApiQuranChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<
    ApiQuranChapter | undefined
  >(undefined);
  const fetchChapter = async () => {
    const res = await fetch(
      'https://api.quran.com/api/v4/chapters?language=en'
    );
    const data = await res.json();
    setChapters(data.chapters);
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chapterId = parseInt(e.currentTarget.value);
    const chapter = chapters.find((chapter) => chapter.id === chapterId);
    setSelectedChapter(chapter);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  };

  return (
    <main>
      <div>
        <h1>Generate quran slides</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chapter">Chapter</label>
          <select
            className="block"
            name="chapter"
            id="chapter"
            onChange={handleChapterChange}
          >
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.name_simple}
              </option>
            ))}
          </select>
          <label htmlFor="startVerse">Start verse</label>
          <select className="block" name="start" id="startVerse">
            {selectedChapter &&
              Array.from({ length: selectedChapter.verses_count }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
          <label htmlFor="endVerse">End verse</label>
          <select className="block" name="end" id="endVerse">
            {selectedChapter &&
              Array.from({ length: selectedChapter.verses_count }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
          <button className="block">Generate</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
