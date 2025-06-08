import React from "react";

const BoardTabSkeleton = () => {
  return (
    <div className="grid flex-1 grid-cols-1 gap-8 py-4 @xl:grid-cols-2 @6xl:py-6 @7xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-6">
          <div className="skeleton h-10 flex-shrink-0 rounded-lg @xl:h-14" />
          <div className="skeleton flex-1 rounded-lg" />
          <div className="skeleton hidden flex-1 rounded-lg @7xl:block" />
        </div>
      ))}
    </div>
  );
};

export default BoardTabSkeleton;
