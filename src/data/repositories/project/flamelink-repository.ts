import { Project, ProjectRepository } from "@/features/project";

export class ProjectFlameLinkRepository implements ProjectRepository {
  getProjectByID(id: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }
  getProjects(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}
