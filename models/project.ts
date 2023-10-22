import { Project, SerializedProject } from "types";

export default class ProjectModel implements SerializedProject {
  public readonly title: string;
  public readonly content: string;
  public readonly description: string;
  public readonly id: string;
  public readonly link?: string;
  public readonly imageId: string;
  public readonly technology: string;
  public readonly active: boolean;

  constructor(project: Project) {
    this.title = project.title;
    this.content = project.content;
    this.description = project.description;
    this.id = project.id;
    this.link = project.link;
    this.imageId = project.image[0]?.id;
    this.technology = project.technology;
    this.active = project.active;
  }

  public toJson() {
    return {
      title: this.title,
      content: this.content,
      description: this.description,
      id: this.id,
      link: this.link || null,
      imageId: this.imageId,
      technology: this.technology,
    } as SerializedProject;
  }
}

export async function getSerializedProjects(projects: Promise<Project[]>) {
  return projects.then(async (projects) =>
    projects.filter((p) => p.active).map((p) => new ProjectModel(p).toJson())
  );
}
