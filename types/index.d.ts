import firebase from 'firebase/app';



interface Folder {
    id: string;
    name: string;
    order: number;
    parentId: number;
}

interface Sizes {
    height: number;
    path: string;
    quality: number;
    width: number;
}


export interface File {
    contentType: string;
    file: string;
    folderId: firebase.firestore.DocumentReference<Folder>;
    id: string;
    type: string;
    sizes: Sizes[];
}

export interface Project {
    title: string;
    content: string;
    description: string;
    id: string;
    image: firebase.firestore.DocumentReference<File>[];
    technology: string;
}