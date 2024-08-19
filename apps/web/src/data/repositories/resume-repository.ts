import { firebase_storage, firestore } from "@/data/firebase";
import { FirebaseCollections, Resume } from "@repo/contracts";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export interface ResumeRepository {
  getResume(): Promise<Resume | null>;
}

export class ResumeFirebaseRepository implements ResumeRepository {
  async getResume() {
    const querySnapshot = await getDocs(
      collection(firestore, FirebaseCollections.RESUME)
    );

    const resume = querySnapshot.docs[0];

    if (!resume) {
      return null;
    }

    const resumeData = <Resume>resume.data();
    const file = await getDownloadURL(ref(firebase_storage, resumeData.file));

    return new Resume(file);
  }
}
