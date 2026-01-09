import { getAdminStorage } from "@/lib/firebase-admin";
import { FirebaseFilePaths } from "@repo/contracts";
import { nanoid } from "nanoid";

interface ImageUploadResult {
  storagePath: string;
  success: boolean;
  error?: string;
}

function isBase64Image(str: string): boolean {
  return str.startsWith("data:image/") || /^[A-Za-z0-9+/=]+$/.test(str);
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function getExtensionFromMimeType(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
  };
  return mimeToExt[mimeType] || "jpg";
}

function parseBase64Image(base64String: string): {
  buffer: Buffer;
  mimeType: string;
} {
  let data = base64String;
  let mimeType = "image/jpeg";

  if (base64String.startsWith("data:")) {
    const matches = base64String.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      mimeType = matches[1]!;
      data = matches[2]!;
    }
  }

  return {
    buffer: Buffer.from(data, "base64"),
    mimeType,
  };
}

async function downloadImageFromUrl(url: string): Promise<{
  buffer: Buffer;
  mimeType: string;
}> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const arrayBuffer = await response.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    mimeType: contentType,
  };
}

export async function uploadImage(
  imageData: string
): Promise<ImageUploadResult> {
  try {
    const storage = getAdminStorage();
    const bucket = storage.bucket();

    let buffer: Buffer;
    let mimeType: string;

    if (isUrl(imageData)) {
      const downloaded = await downloadImageFromUrl(imageData);
      buffer = downloaded.buffer;
      mimeType = downloaded.mimeType;
    } else if (isBase64Image(imageData)) {
      const parsed = parseBase64Image(imageData);
      buffer = parsed.buffer;
      mimeType = parsed.mimeType;
    } else {
      return {
        storagePath: "",
        success: false,
        error: "Invalid image data: must be base64 or URL",
      };
    }

    const extension = getExtensionFromMimeType(mimeType);
    const fileName = `${nanoid()}.${extension}`;
    const storagePath = `${FirebaseFilePaths.PROJECTS}/${fileName}`;

    const file = bucket.file(storagePath);

    await file.save(buffer, {
      metadata: {
        contentType: mimeType,
        metadata: {
          uploadedVia: "mcp",
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    return {
      storagePath,
      success: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      storagePath: "",
      success: false,
      error: `Failed to upload image: ${message}`,
    };
  }
}

export async function deleteImage(storagePath: string): Promise<boolean> {
  try {
    const storage = getAdminStorage();
    const bucket = storage.bucket();
    const file = bucket.file(storagePath);

    await file.delete();
    return true;
  } catch {
    return false;
  }
}
