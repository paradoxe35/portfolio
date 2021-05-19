import { Project, SerializedProject } from 'types';

export default class ProjectModel implements SerializedProject {

    public title: string;
    public content: string;
    public description: string;
    public id: string;
    public link?: string;
    public imageId: string;
    public technology: string;

    constructor(project: Project) {
        this.title = project.title
        this.content = project.content
        this.description = project.description
        this.id = project.id
        this.link = project.link
        this.imageId = project.image[0]?.id;
        this.technology = project.technology
    }

    public toJson() {
        return {
            title: this.title,
            content: this.content,
            description: this.description,
            id: this.id,
            link: this.link || null,
            imageId: this.imageId,
            technology: this.technology
        } as SerializedProject
    }
}

export async function getSerializedProjects(projects: Promise<Project[]>) {
    return projects.then(async projects => projects.map(p => (new ProjectModel(p)).toJson()))
}