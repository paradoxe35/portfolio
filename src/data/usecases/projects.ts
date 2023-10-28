import { getProjects } from "@/features/project";
import { ProjectFirebaseRepository } from "@/data/repositories/project";

export function getProjectsUsecase() {
  return getProjects(new ProjectFirebaseRepository());
}
