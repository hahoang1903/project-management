import React from "react";

const ProjectTitleSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton h-10 flex-shrink-0 rounded-lg" />
      <div className="skeleton h-16 rounded-lg" />
    </div>
  );
};

export default ProjectTitleSkeleton;
