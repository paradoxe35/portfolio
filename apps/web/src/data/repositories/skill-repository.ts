import { firebase_storage, firestore } from "@/data/firebase";
import { FirebaseCollections, Skill } from "@repo/contracts";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Types
export interface SkillRepository {
  getSkills(): Promise<Skill[]>;
}

// Implementations
export class SkillFirebaseRepository implements SkillRepository {
  async getSkills(): Promise<Skill[]> {
    const querySnapshot = await getDocs(
      collection(firestore, FirebaseCollections.SKILLS)
    );

    const skills = querySnapshot.docs.map(async (doc) => {
      const data = <Skill>doc.data();
      return this.fromObject(doc.id, data);
    });

    return Promise.all(skills);
  }

  private async fromObject(id: string, object: Skill) {
    const icons = object.icons.map((icon) => {
      return getDownloadURL(ref(firebase_storage, icon));
    });

    const resolvedIcons = await Promise.all(icons);

    return new Skill(
      id,
      object.name,
      resolvedIcons,
      object.status,
      object.className
    );
  }
}
