import { Project, ProjectRepository } from "@/features/project";

export class ProjectFlameLinkRepository implements ProjectRepository {
  getProjects(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}
