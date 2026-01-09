import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getAdminFirestore, getAdminStorage } from "@/lib/firebase-admin";
import { FirebaseCollections } from "@repo/contracts";
import { uploadImage, deleteImage } from "../utils/image-upload";
import { getDownloadURL } from "firebase-admin/storage";

const statusEnum = z.enum(["published", "draft", "archived"]);

async function getImageUrl(storagePath: string): Promise<string> {
  try {
    const storage = getAdminStorage();
    const bucket = storage.bucket();
    const file = bucket.file(storagePath);
    return await getDownloadURL(file);
  } catch {
    return storagePath;
  }
}

export function registerProjectTools(server: McpServer) {
  // List Projects Tool
  server.registerTool(
    "list_projects",
    {
      title: "List Projects",
      description:
        "Get a list of all projects. Returns project metadata without the full content field to reduce response size.",
      inputSchema: {
        status: statusEnum.optional().describe("Filter by project status"),
        limit: z
          .number()
          .int()
          .min(1)
          .max(100)
          .optional()
          .describe("Maximum number of projects to return (default: 50)"),
      },
    },
    async ({ status, limit = 50 }) => {
      try {
        const db = getAdminFirestore();
        let query: FirebaseFirestore.Query = db.collection(
          FirebaseCollections.PROJECTS
        );

        if (status) {
          query = query.where("status", "==", status);
        }

        query = query.limit(limit as number);

        const snapshot = await query.get();

        const projects = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageUrl = await getImageUrl(data.image);
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              technology: data.technology,
              status: data.status,
              image: imageUrl,
              link: data.link || null,
              order: data.order ?? 0,
            };
          })
        );

        // Sort by order (ascending), projects without order come first
        projects.sort((a, b) => a.order - b.order);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(projects, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: message }),
            },
          ],
        };
      }
    }
  );

  // Get Project Tool
  server.registerTool(
    "get_project",
    {
      title: "Get Project",
      description:
        "Get a single project by ID with all details including the full markdown content.",
      inputSchema: {
        id: z.string().min(1).describe("The project ID"),
      },
    },
    async ({ id }) => {
      try {
        const db = getAdminFirestore();
        const doc = await db
          .collection(FirebaseCollections.PROJECTS)
          .doc(id as string)
          .get();

        if (!doc.exists) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ error: "Project not found" }),
              },
            ],
          };
        }

        const data = doc.data()!;
        const imageUrl = await getImageUrl(data.image);

        const project = {
          id: doc.id,
          title: data.title,
          description: data.description,
          technology: data.technology,
          content: data.content,
          status: data.status,
          image: imageUrl,
          link: data.link || null,
          order: data.order || 0,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(project, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: message }),
            },
          ],
        };
      }
    }
  );

  // Create Project Tool
  server.registerTool(
    "create_project",
    {
      title: "Create Project",
      description:
        "Create a new project. The image can be provided as base64 data or a URL.",
      inputSchema: {
        title: z.string().min(1).describe("Project title"),
        description: z.string().min(1).describe("Short project description"),
        technology: z
          .string()
          .min(1)
          .describe("Technologies used (comma-separated)"),
        content: z
          .string()
          .min(50)
          .describe("Full project content in markdown format (min 50 chars)"),
        status: statusEnum
          .default("draft")
          .describe("Project status: published, draft, or archived"),
        image: z
          .string()
          .min(1)
          .describe(
            "Image as base64 data (with or without data URI prefix) or URL"
          ),
        link: z.string().url().optional().describe("External project link"),
        order: z
          .number()
          .int()
          .min(0)
          .optional()
          .describe("Sort order (lower values appear first, 0 = unordered)"),
      },
    },
    async ({
      title,
      description,
      technology,
      content,
      status,
      image,
      link,
      order,
    }) => {
      try {
        // Upload image
        const imageResult = await uploadImage(image as string);

        if (!imageResult.success) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: imageResult.error,
                }),
              },
            ],
          };
        }

        const db = getAdminFirestore();
        const projectData = {
          title,
          description,
          technology,
          content,
          status: status || "draft",
          image: imageResult.storagePath,
          link: link || null,
          order: order ?? 0,
        };

        const docRef = await db
          .collection(FirebaseCollections.PROJECTS)
          .add(projectData);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                id: docRef.id,
                message: "Project created successfully",
              }),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: message,
              }),
            },
          ],
        };
      }
    }
  );

  // Update Project Tool
  server.registerTool(
    "update_project",
    {
      title: "Update Project",
      description:
        "Update an existing project. Only provided fields will be updated.",
      inputSchema: {
        id: z.string().min(1).describe("The project ID to update"),
        title: z.string().min(1).optional().describe("New project title"),
        description: z
          .string()
          .min(1)
          .optional()
          .describe("New short description"),
        technology: z
          .string()
          .min(1)
          .optional()
          .describe("New technologies list"),
        content: z
          .string()
          .min(50)
          .optional()
          .describe("New markdown content (min 50 chars)"),
        status: statusEnum.optional().describe("New project status"),
        image: z
          .string()
          .min(1)
          .optional()
          .describe("New image as base64 or URL"),
        link: z.string().url().optional().describe("New external link"),
        order: z.number().int().min(0).optional().describe("New sort order"),
      },
    },
    async ({
      id,
      title,
      description,
      technology,
      content,
      status,
      image,
      link,
      order,
    }) => {
      try {
        const db = getAdminFirestore();
        const docRef = db
          .collection(FirebaseCollections.PROJECTS)
          .doc(id as string);

        const doc = await docRef.get();

        if (!doc.exists) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Project not found",
                }),
              },
            ],
          };
        }

        const updateData: Record<string, unknown> = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (technology !== undefined) updateData.technology = technology;
        if (content !== undefined) updateData.content = content;
        if (status !== undefined) updateData.status = status;
        if (link !== undefined) updateData.link = link;
        if (order !== undefined) updateData.order = order;

        // Handle image update
        if (image !== undefined) {
          const imageResult = await uploadImage(image as string);

          if (!imageResult.success) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    success: false,
                    error: imageResult.error,
                  }),
                },
              ],
            };
          }

          // Delete old image
          const oldData = doc.data()!;
          if (oldData.image) {
            await deleteImage(oldData.image);
          }

          updateData.image = imageResult.storagePath;
        }

        if (Object.keys(updateData).length === 0) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "No fields to update",
                }),
              },
            ],
          };
        }

        await docRef.update(updateData);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                id: id,
                message: "Project updated successfully",
                updatedFields: Object.keys(updateData),
              }),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: message,
              }),
            },
          ],
        };
      }
    }
  );

  // Delete Project Tool
  server.registerTool(
    "delete_project",
    {
      title: "Delete Project",
      description:
        "Delete a project by ID. This also deletes the associated image from storage.",
      inputSchema: {
        id: z.string().min(1).describe("The project ID to delete"),
      },
    },
    async ({ id }) => {
      try {
        const db = getAdminFirestore();
        const docRef = db
          .collection(FirebaseCollections.PROJECTS)
          .doc(id as string);

        const doc = await docRef.get();

        if (!doc.exists) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Project not found",
                }),
              },
            ],
          };
        }

        // Delete image from storage
        const data = doc.data()!;
        if (data.image) {
          await deleteImage(data.image);
        }

        // Delete document
        await docRef.delete();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                id: id,
                message: "Project deleted successfully",
              }),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: message,
              }),
            },
          ],
        };
      }
    }
  );

  // Publish Project Tool
  server.registerTool(
    "publish_project",
    {
      title: "Publish Project",
      description:
        "Publish a draft project, making it visible on the portfolio.",
      inputSchema: {
        id: z.string().min(1).describe("The project ID to publish"),
      },
    },
    async ({ id }) => {
      try {
        const db = getAdminFirestore();
        const docRef = db
          .collection(FirebaseCollections.PROJECTS)
          .doc(id as string);

        const doc = await docRef.get();

        if (!doc.exists) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Project not found",
                }),
              },
            ],
          };
        }

        const data = doc.data()!;
        if (data.status === "published") {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Project is already published",
                }),
              },
            ],
          };
        }

        await docRef.update({ status: "published" });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                id: id,
                message: "Project published successfully",
              }),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: message,
              }),
            },
          ],
        };
      }
    }
  );

  // Unpublish Project Tool
  server.registerTool(
    "unpublish_project",
    {
      title: "Unpublish Project",
      description: "Unpublish a project, changing its status back to draft.",
      inputSchema: {
        id: z.string().min(1).describe("The project ID to unpublish"),
      },
    },
    async ({ id }) => {
      try {
        const db = getAdminFirestore();
        const docRef = db
          .collection(FirebaseCollections.PROJECTS)
          .doc(id as string);

        const doc = await docRef.get();

        if (!doc.exists) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Project not found",
                }),
              },
            ],
          };
        }

        const data = doc.data()!;
        if (data.status === "draft") {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "Project is already a draft",
                }),
              },
            ],
          };
        }

        await docRef.update({ status: "draft" });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                id: id,
                message: "Project unpublished successfully",
              }),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: message,
              }),
            },
          ],
        };
      }
    }
  );
}
