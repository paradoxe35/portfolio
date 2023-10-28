import { FIREBASE_CONFIG } from "./constants";

import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/storage";

const FirebaseApp: firebase.app.App = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();

export default FirebaseApp;
