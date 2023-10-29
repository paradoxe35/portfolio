import {
  FirebaseCollections,
  firebase_storage,
  firestore,
} from "@/data/firebase";
import { Project, ProjectRepository } from "@/features/project";

// Firebase
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export class ProjectFirebaseRepository implements ProjectRepository {
  async getProjectByID(id: string) {
    const docRef = doc(firestore, FirebaseCollections.PROJECTS, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return this.fromObject(docSnap.id, <Project>docSnap.data());
  }

  async getProjects() {
    const querySnapshot = await getDocs(
      collection(firestore, FirebaseCollections.PROJECTS)
    );

    const projects = querySnapshot.docs.map(async (doc) => {
      const data = <Project>doc.data();
      return this.fromObject(doc.id, data);
    });

    return Promise.all(projects);
  }

  private async fromObject(id: string, object: Project) {
    const file = await getDownloadURL(ref(firebase_storage, object.image));

    return new Project(
      id,
      object.title,
      object.content,
      object.status,
      object.description,
      file,
      object.technology,
      object.link
    );
  }
}
