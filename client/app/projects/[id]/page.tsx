import HydrateClient from "@/components/hydrate-client";
import ProjectView from "@/components/projects/project-view";
import { prefetch, trpc } from "@/lib/trpc/server-utils";

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  prefetch(trpc.task.getByProject.queryOptions(id));

  return (
    <HydrateClient>
      <ProjectView id={id} />
    </HydrateClient>
  );
};

export default ProjectPage;
