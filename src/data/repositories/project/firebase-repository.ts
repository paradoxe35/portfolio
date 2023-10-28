import { Project, ProjectRepository } from "@/features/project";

export class ProjectFirebaseRepository implements ProjectRepository {
  getProjectByID(id: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }
  getProjects(): Promise<Project[]> {
    // throw new Error("Method not implemented.");

    return Promise.resolve([]);
  }
}
