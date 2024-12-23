import SlidesBox from '../components/SlidesBox';

interface DisplaySlidesPageProps {
  searchParams: {
		chapter_id: number;
		verse_from: number;
		verse_to: number;
  };
}

const DisplaySlidesPage = ({ searchParams }: DisplaySlidesPageProps): React.JSX.Element => {
	return (
		<SlidesBox
			chapterId={Number(searchParams.chapter_id)}
			verseFrom={Number(searchParams.verse_from)}
			verseTo={Number(searchParams.verse_to)}
		/>
	);
}

export default DisplaySlidesPage;