import { ProjectRepository } from "./repository";

export function getProjects(repo: ProjectRepository) {
  return repo.getProject();
}
