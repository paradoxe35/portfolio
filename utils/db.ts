import FirebaseApp from "utils/firebase"
import firebase from 'firebase/app';
import { Project } from "types";


const converter = <T>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
        snap.data() as T
})

const dataPoint = <T>(collectionPath: string, schema: string) =>
    FirebaseApp.firestore().collection(collectionPath).withConverter(converter<T>()).where('_fl_meta_.schema', '==', schema)


const db = {
    projects: dataPoint<Project>('fl_content', 'projects')
}


export { db }