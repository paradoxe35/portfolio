import {
  FirebaseCollections,
  firebase_storage,
  firestore,
} from "@/data/firebase";
import { Resume, ResumeRepository } from "@/features/resume";

// Firebase
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

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
