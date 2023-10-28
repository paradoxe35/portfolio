import { FIREBASE_CONFIG } from "@/utils/constants";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import "firebase/firestore";
import "firebase/storage";

const FirebaseApp = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();

const firestore = getFirestore(FirebaseApp);

export { FirebaseApp, firestore };

export * from "./collections";
