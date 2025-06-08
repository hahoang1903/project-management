"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "../providers/trpc-providers";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/store";
import { setProjects } from "@/lib/redux/project-state";
import SidebarLink from "../layout/sidebar/link";
import { BriefcaseBusiness } from "lucide-react";

const ProjectList = () => {
  const trpc = useTRPC();
  const { data: projects } = useSuspenseQuery(
    trpc.project.getAll.queryOptions(),
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProjects(projects));
  }, [dispatch, projects]);

  return (
    <>
      {projects.map((project) => (
        <SidebarLink
          key={project.id}
          icon={BriefcaseBusiness}
          label={project.name}
          href={`/projects/${project.id}`}
        />
      ))}
    </>
  );
};

export default ProjectList;
