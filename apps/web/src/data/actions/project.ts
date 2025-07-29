import { ProjectFirebaseRepository } from "../repositories/project-repository";

const repo = new ProjectFirebaseRepository();

export async function getProjects(limit?: number) {
  const projects = (await repo.getProjects())
    .filter((project) => project.status === "published")
    .slice(0, limit);

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectByID(id: string) {
  return repo.getProjectByID(id);
}
