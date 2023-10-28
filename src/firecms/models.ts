import { FirebaseCollections, FirebaseFilePaths } from "@/data/firebase";
import { Project } from "@/features/project";
import { Resume } from "@/features/resume";
import { Skill } from "@/features/skill";
import { NonFunctionProperties } from "@/types";
import { buildCollection, buildProperty } from "firecms";
import { nanoid } from "nanoid";

type EntityCollection<T> = Omit<NonFunctionProperties<T>, "id">;

function randomizeFileName(fileName: string): string {
  const parts = fileName.split(".");
  const uniqueid = nanoid();
  if (parts.length < 2) {
    return `${fileName}_${uniqueid}`;
  }

  const name = parts.slice(0, -1).join(".");
  const extension = parts[parts.length - 1];

  return `${name}_${uniqueid}.${extension}`;
}

// Project Collection
const projectsCollection = buildCollection<EntityCollection<Project>>({
  name: "Projects",
  singularName: "Project",
  path: FirebaseCollections.PROJECTS,
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    read: true,
    delete: true,
  }),
  properties: {
    title: {
      name: "title",
      validation: { required: true, trim: true, unique: true },
      description: "Project title",
      dataType: "string",
    },

    image: buildProperty({
      name: "Image",
      dataType: "string",
      validation: { required: true },
      storage: {
        storagePath: FirebaseFilePaths.PROJECTS,
        maxSize: 1024 * 1024 * 5,
        acceptedFiles: ["image/*"],
        fileName: (context) => {
          return randomizeFileName(context.file.name);
        },
      },
    }),

    description: {
      name: "Description",
      description: "Project description",
      dataType: "string",
      columnWidth: 300,
    },

    technology: {
      name: "Technology",
      description: "Project technologies used",
      dataType: "string",
      validation: { required: true },
      columnWidth: 300,
    },

    content: {
      name: "Content",
      markdown: true,
      validation: {
        required: true,
        requiredMessage: "Content fields cannot be less than 50 char",
        min: 50,
      },
      description: "Project content",
      dataType: "string",
    },

    status: {
      name: "Status",
      validation: { required: true },
      dataType: "string",
      description: "Project status: draft | published | archived",
      defaultValue: "draft",
      enumValues: {
        draft: "Draft",
        published: "Published",
        archived: "Archived",
      },
    },

    link: {
      name: "Link",
      url: true,
      validation: {
        required: true,
      },
      description: "Project external link",
      dataType: "string",
    },
  },
});

// Skill collection
const skillsCollection = buildCollection<EntityCollection<Skill>>({
  name: "Skills",
  singularName: "skill",
  path: FirebaseCollections.SKILLS,
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    read: true,
    delete: true,
  }),

  properties: {
    name: {
      name: "name",
      validation: { required: true, trim: true, unique: true },
      description: "Skill name",
      dataType: "string",
    },

    icons: buildProperty({
      name: "Icons",
      dataType: "array",
      description: "Skills icons",
      validation: { required: true },
      of: {
        dataType: "string",
        storage: {
          storagePath: FirebaseFilePaths.SKILLS,
          maxSize: 1024 * 1024 * 5,
          acceptedFiles: ["image/*"],
          fileName: (context) => {
            return randomizeFileName(context.file.name);
          },
        },
      },
    }),

    className: {
      name: "className",
      validation: { required: false },
      description: "UI ClassName",
      dataType: "string",
    },
  },
});

// Resume Collection
const resumeCollection = buildCollection<EntityCollection<Resume>>({
  name: "Resume (CV)",
  singularName: "Resume",
  path: FirebaseCollections.RESUME,
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    read: true,
    delete: true,
  }),

  properties: {
    file: buildProperty({
      name: "file",
      dataType: "string",
      description: "File PDF",
      validation: { required: true },
      storage: {
        storagePath: FirebaseFilePaths.RESUME,
        maxSize: 1024 * 1024 * 5,
        acceptedFiles: ["application/pdf"],
      },
    }),
  },
});

export { projectsCollection, skillsCollection, resumeCollection };
