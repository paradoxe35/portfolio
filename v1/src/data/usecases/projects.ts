import { getProjectByID, getProjects } from "@/features/project";
import { ProjectFirebaseRepository } from "@/data/repositories/project";

const firebaseRepository = new ProjectFirebaseRepository();

export function getProjectsUsecase(limit?: number) {
  return getProjects(firebaseRepository, limit);
}

export function getProjectByIDUsecase(id: string) {
  return getProjectByID(firebaseRepository, id);
}
