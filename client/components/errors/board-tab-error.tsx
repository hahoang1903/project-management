import Image from "next/image";
import type { FallbackProps } from "react-error-boundary";

const BoardTabError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex size-full flex-col items-center pt-20 dark:text-white">
      <Image
        src="/images/error.png"
        alt="logo"
        width={350}
        height={350}
        className="h-auto"
      />

      <div className="px-24 pt-6 text-center">
        <h1 className="text-2xl font-bold">Well, this is disappointing.</h1>
        <p className="pt-3 pb-6 text-base">
          We tried to load your tasks but they&apos;ve disappeared and we have
          no clue why. Maybe they slipped off on a secret vacation or got lost
          behind the scenes, but we&apos;re on the case to track them down.
        </p>
      </div>

      <button
        onClick={resetErrorBoundary}
        className="try-again-btn rounded-lg px-8 py-2 text-lg"
      >
        Try again
      </button>
    </div>
  );
};

export default BoardTabError;
