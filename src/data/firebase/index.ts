import { FIREBASE_CONFIG } from "@/utils/constants";

import firebase from "firebase/compat/app";

import "firebase/firestore";
import "firebase/storage";

const FirebaseApp = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();

export * from "./collections";
export default FirebaseApp;
