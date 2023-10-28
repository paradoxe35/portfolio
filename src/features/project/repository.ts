import { Project } from "./entity";

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
}
