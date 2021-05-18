import firebase from 'firebase/app';
import { Project, File } from 'types';


export default class ProjectModel {

    public title: string;
    public content: string;
    public description: string;
    public id: string;
    private image: firebase.firestore.DocumentReference<File>[];
    public technology: string;

    constructor(project: Project) {
        this.title = project.title
        this.content = project.content
        this.description = project.description
        this.id = project.id
        this.image = project.image
        this.technology = project.technology
    }

    public async getImage() {
        return (await this.image[0].get()).data()
    }
}