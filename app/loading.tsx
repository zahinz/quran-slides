import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ArrowPathIcon className="h-6xl w-6xl loading-spinner text-secondary-main" />
    </div>
  );
};

export default Loading;
