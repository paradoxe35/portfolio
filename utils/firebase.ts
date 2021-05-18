import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIRE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIRE_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_FIRE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIRE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIRE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIRE_MEASUREMENTID
}

const FirebaseApp: firebase.app.App = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export default FirebaseApp