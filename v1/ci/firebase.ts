import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  Unsubscribe,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import { FIREBASE_COLLECTIONS, FIREBASE_CONFIG } from "./constants";

const config = JSON.parse(FIREBASE_CONFIG || "{}");
const app = initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export function initFirebaseInstance() {
  const unsubscribes: Unsubscribe[] = [];

  let callback = {
    value: (_: QuerySnapshot<DocumentData, DocumentData>) => {},
  };

  // Delay to void the default snapshot event on programm statup
  let can_listen = false;

  setTimeout(() => {
    can_listen = true;
  }, 1000);

  FIREBASE_COLLECTIONS.forEach((collection_name) => {
    const q = query(collection(db, collection_name));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => can_listen && callback.value(snapshot)
    );

    unsubscribes.push(unsubscribe);
  });

  return {
    onSnapshot: (
      fn: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void
    ) => {
      callback.value = fn;
    },
    unsubscribe: () => {
      unsubscribes.forEach((fn) => fn());
    },
  };
}
