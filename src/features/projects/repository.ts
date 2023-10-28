import { Project } from "./entity";

export interface ProjectRepository {
  getProject(): Promise<Project[]>;
}
