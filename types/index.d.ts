import firebase from "firebase/app";

interface Folder {
  id: string;
  name: string;
  order: number;
  parentId: number;
}

export interface SerializedProject {
  title: string;
  content: string;
  description: string;
  id: string;
  imageId: string;
  link?: string;
  technology: string;
}

export interface SerializedSkill {
  name: string;
  icons: { id: string }[];
  id?: string;
}

export interface Project {
  title: string;
  content: string;
  description: string;
  id: string;
  link?: string;
  image: firebase.firestore.DocumentReference<File>[];
  technology: string;
}

interface Sizes {
  height: number;
  path: string;
  quality: number;
  width: number;
}

export interface Resume {
  resume: firebase.firestore.DocumentReference<File>[];
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

export type Skill<IMG = Partial<firebase.firestore.DocumentReference<File>>> = {
  id?: string;
  name: string;
  icons: IMG[];
  className?: string;
};
