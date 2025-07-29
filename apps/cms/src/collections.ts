import { buildCollection, buildProperty } from "firecms";
import {
  FirebaseCollections,
  FirebaseFilePaths,
  Media,
  NonFunctionProperties,
  Project,
  Resume,
  Skill,
} from "@repo/contracts";

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
  textSearchEnabled: true,
  inlineEditing: false,
  icon: "backup_table",
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

    order: {
      name: "Order",
      validation: { required: false },
      defaultValue: 0,
      dataType: "number",
      description:
        "Sort order. Lower values appear first (1, 2, 3...). A 0 is treated as 'unordered' and appears last. Default: 0.",
    },

    image: buildProperty({
      name: "Image",
      dataType: "string",
      validation: { required: true },
      storage: {
        storagePath: FirebaseFilePaths.PROJECTS,
        maxSize: 1024 * 1024 * 5,
        acceptedFiles: ["image/*"],
        imageCompression: {
          maxWidth: 1080,
          quality: 75,
        },
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
      validation: { required: true },
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
      description: "Project Markdown content",
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
        required: false,
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
  textSearchEnabled: true,
  inlineEditing: false,
  icon: "school",
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
      name: "icons",
      dataType: "array",
      description: "Skills icons",
      validation: { required: true },
      of: {
        dataType: "string",
        name: "image",
        storage: {
          storagePath: FirebaseFilePaths.SKILLS,
          maxSize: 1024 * 1024 * 5,
          acceptedFiles: ["image/*"],
          imageCompression: {
            maxWidth: 360,
            quality: 75,
          },
          fileName: (context) => {
            return randomizeFileName(context.file.name);
          },
        },
      },
    }),

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

    style: {
      name: "Style",
      validation: { required: false },
      description: "Skill style CSS",
      dataType: "map",
      keyValue: true,
    },
  },
});

// Resume Collection
const resumeCollection = buildCollection<EntityCollection<Resume>>({
  name: "Resume (CV)",
  singularName: "Resume",
  path: FirebaseCollections.RESUME,
  icon: "description",
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

// Resume Collection
const mediaCollection = buildCollection<EntityCollection<Media>>({
  name: "Media files",
  singularName: "Media",
  path: FirebaseCollections.MEDIAS,
  icon: "perm_media",
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
      description: "File: Video, Image, PDF, Document etc.",
      validation: { required: true },
      storage: {
        storagePath: FirebaseFilePaths.MEDIAS,
        maxSize: 1024 * 1024 * 50, // 50MG
        acceptedFiles: ["application/pdf", "image/*", "video/*"],
        imageCompression: {
          maxWidth: 1080,
          quality: 75,
        },
      },
    }),
  },
});

export {
  projectsCollection,
  skillsCollection,
  resumeCollection,
  mediaCollection,
};
