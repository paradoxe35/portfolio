import { Project, ProjectRepository } from "@/features/project";

export class ProjectFirebaseRepository implements ProjectRepository {
  getProjects(): Promise<Project[]> {
    // throw new Error("Method not implemented.");

    return Promise.resolve([]);
  }
}
