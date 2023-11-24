export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly status: "published" | "draft" | "archived",
    public readonly description: string,
    public readonly image: string,
    public readonly technology: string,
    public readonly link?: string
  ) {}
}

export interface ProjectRepository {
  getProjects(limit?: number): Promise<Project[]>;
  getProjectByID(id: string): Promise<Project | null>;
}

export async function getProjects(repo: ProjectRepository, limit?: number) {
  const projects = await repo.getProjects(limit);
  return projects
    .filter((project) => project.status === "published")
    .slice(0, limit);
}

export function getProjectByID(repo: ProjectRepository, id: string) {
  return repo.getProjectByID(id);
}
