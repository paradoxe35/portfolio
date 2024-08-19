import { firebase_storage, firestore } from "@/data/firebase";
import { FirebaseCollections, Media } from "@repo/contracts";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Types
export interface MediaRepository {
  getMedia(): Promise<Media[]>;
}

// Implementations
export class MediaFirebaseRepository implements MediaRepository {
  async getMedia() {
    const querySnapshot = await getDocs(
      collection(firestore, FirebaseCollections.MEDIAS)
    );

    const medias = querySnapshot.docs.map(async (doc) => {
      const data = <Media>doc.data();
      return this.fromObject(doc.id, data);
    });

    return Promise.all(medias);
  }

  private async fromObject(id: string, object: Media) {
    const file = await getDownloadURL(ref(firebase_storage, object.file));
    return new Media(id, file);
  }
}
