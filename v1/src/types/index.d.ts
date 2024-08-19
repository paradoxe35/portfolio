import firebase from "firebase/app";

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

export type Position = {
  left: number;
  top: number;
};

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
