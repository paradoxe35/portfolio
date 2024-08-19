import { FIREBASE_CONFIG } from "@/utils/constants";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import "firebase/firestore";
import "firebase/storage";

const FirebaseApp = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();

const firestore = getFirestore(FirebaseApp);
const firebase_storage = getStorage(FirebaseApp);

export { FirebaseApp, firestore, firebase_storage };

export * from "./collections";
