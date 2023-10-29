import { ProjectRepository } from "./repository";

export async function getProjects(repo: ProjectRepository) {
  const projects = await repo.getProjects();
  return projects.filter((project) => project.status === "published");
}

export function getProjectByID(repo: ProjectRepository, id: string) {
  return repo.getProjectByID(id);
}
