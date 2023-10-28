import { ProjectRepository } from "./repository";

export function getProjects(repo: ProjectRepository) {
  return repo.getProjects();
}

export function getProjectByID(repo: ProjectRepository, id: string) {
  return repo.getProjectByID(id);
}
