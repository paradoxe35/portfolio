import { getProjectByID, getProjects } from "@/features/project";
import { ProjectFirebaseRepository } from "@/data/repositories/project";

const firebaseRepository = new ProjectFirebaseRepository();

export function getProjectsUsecase() {
  return getProjects(firebaseRepository);
}

export function getProjectByIDUsecase(id: string) {
  return getProjectByID(firebaseRepository, id);
}
