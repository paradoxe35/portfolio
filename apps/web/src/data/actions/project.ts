import { ProjectFirebaseRepository } from "../repositories/project-repository";

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

const repo = new ProjectFirebaseRepository();

export async function getProjects(limit?: number) {
  return (await repo.getProjects())
    .filter((project) => project.status === "published")
    .slice(0, limit);
}

export function getProjectByID(id: string) {
  return repo.getProjectByID(id);
}
