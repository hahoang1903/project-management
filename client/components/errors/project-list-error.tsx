import { HeartCrack } from "lucide-react";
import { FallbackProps } from "react-error-boundary";

const ProjectListError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="mx-8 my-4 flex gap-2 rounded-md border border-red-600 p-3">
      <HeartCrack className="size-5 flex-shrink-0 text-red-600 dark:text-red-400" />
      <div className="pb-2">
        <p className="text-sm font-bold text-red-600 dark:text-red-400">
          Oops! Something went wrong!
        </p>
        <p className="pt-1 pb-4 text-xs dark:text-neutral-300">
          We were excited to show your projects, but they didn&apos;t show up.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="try-again-btn rounded-md px-5 py-1"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ProjectListError;
