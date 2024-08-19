import { ProjectFirebaseRepository } from "../repositories/project-repository";

const repo = new ProjectFirebaseRepository();

export async function getProjects(limit?: number) {
  return (await repo.getProjects())
    .filter((project) => project.status === "published")
    .slice(0, limit);
}

export function getProjectByID(id: string) {
  return repo.getProjectByID(id);
}
