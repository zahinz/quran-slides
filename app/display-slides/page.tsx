import SlidesBox from '../components/SlidesBox';

interface DisplaySlidesPageProps {
  searchParams: {
		chapter_id: number;
		verse_from: number;
		verse_to: number;
  };
}

const DisplaySlidesPage = async ({ searchParams }: DisplaySlidesPageProps): Promise<React.JSX.Element> => {
	return (
		<div className="flex flex-col items-center py-xl">
      <SlidesBox
				chapterId={Number(searchParams.chapter_id)}
				verseFrom={Number(searchParams.verse_from)}
				verseTo={Number(searchParams.verse_to)}
			/>
    </div>
	);
}

export default DisplaySlidesPage;