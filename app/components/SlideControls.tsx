
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon, SpeakerWaveIcon } from '@heroicons/react/20/solid';
import QsButton from './QsButton';
import { RefObject, useEffect, useState } from 'react';
import { Audio, LanguageItem } from '../models';
import QsListbox from './QsListbox';
import { LANGUAGES_LIST } from '../services/lib';

interface SlideControlsProps {
	containerRef: RefObject<HTMLDivElement>;
	onClickLeft: () => void;
	onClickRight: () => void;
	slideAudio: Audio;
	onClickAudio: () => void;
	isLoadingAudio: boolean;
	selectedLanguage: LanguageItem;
	onChangeLanguage: (lng: LanguageItem) => void;
}

const SlideControls = ({
	containerRef,
	onClickLeft,
	onClickRight,
	slideAudio,
	onClickAudio,
	isLoadingAudio,
	selectedLanguage,
	onChangeLanguage
}: SlideControlsProps): React.JSX.Element => {
	const [isFullscreenMode, setFullscreenMode] = useState<boolean>(false);
	const [isDisplayed, setDisplayed] = useState<boolean>(false);

	const enterFullScreen = () => {
		const element = containerRef.current;
		if (element) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if ((element as any).webkitRequestFullscreen) {
				(element as any).webkitRequestFullscreen();
			} else if ((element as any).msRequestFullscreen) {
				(element as any).msRequestFullscreen();
			}
		}
	}

	const exitFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else if ((document as any).webkitExitFullscreen) {
			(document as any).webkitExitFullscreen();
		} else if ((document as any).msExitFullscreen) {
			(document as any).msExitFullscreen();
		}
	};

	const handleFullscreenChange = () => {
		if (!document.fullscreenElement) {
			setFullscreenMode(false);
		} else {
			setFullscreenMode(true);
		}
	};

	useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

	const handleContainerMouseEnter = () => {
		setDisplayed(true);
	}

	const handleContainerMouseLeave = () => {
		setDisplayed(false);
	}

	useEffect(() => {
		if (isFullscreenMode) {
			if (containerRef.current) {
				containerRef.current.addEventListener('mouseenter', handleContainerMouseEnter);
				containerRef.current.addEventListener('mouseleave', handleContainerMouseLeave);
			}
		}

		return () => {
      containerRef.current?.removeEventListener('mouseenter', handleContainerMouseEnter);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			containerRef.current?.removeEventListener('mouseleave', handleContainerMouseLeave);
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFullscreenMode]);

	return (
		<div className={`${isDisplayed || !isFullscreenMode ? 'flex' : 'flex sm:hidden'} items-center fixed bottom-0 left-0 gap-lg px-lg py-sm bg-primary-main bg-opacity-30 rounded-md w-full justify-end`}>
			{ slideAudio ?
			<audio
				controls
				autoPlay
			>
				<source src={slideAudio.url} />
			</audio>
			:
			<QsButton
				isLoading={isLoadingAudio}
				onClick={() => onClickAudio()}
			>
				<SpeakerWaveIcon className="h-2xl w-2xl" />
			</QsButton>
			}
			<QsListbox
				items={LANGUAGES_LIST}
				value={selectedLanguage}
				renderValue={(value: LanguageItem) => value.language_name}
				onChange={onChangeLanguage}
				renderOptionItem={(item: LanguageItem) => item.language_name}
				containerClassName="w-auto"
				buttonClassName="py-xs dark:bg-primary-main data-[hover]:bg-primary-hover"
				iconClassName="top-xs"
			/>
			<QsButton
				onClick={() => onClickLeft()}
			>
				<ChevronLeftIcon className="h-2xl w-2xl" />
			</QsButton>
			<QsButton
				onClick={() => onClickRight()}
			>
				<ChevronRightIcon className="h-2xl w-2xl" />
			</QsButton>
			<QsButton
				onClick={() => isFullscreenMode ? exitFullscreen() : enterFullScreen()}
			>
				{isFullscreenMode ?
				<ArrowsPointingInIcon className="h-2xl w-2xl" />
				:
				<ArrowsPointingOutIcon className="h-2xl w-2xl" />
				}
			</QsButton>
		</div>
	);
};

export default SlideControls;