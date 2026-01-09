import {
  initializeApp,
  getApps,
  cert,
  type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function getServiceAccount(): ServiceAccount {
  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountEnv) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
  }

  try {
    return JSON.parse(serviceAccountEnv) as ServiceAccount;
  } catch {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT is not valid JSON. Ensure it contains the full service account JSON."
    );
  }
}

function getAdminApp() {
  const existingApps = getApps();

  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  const serviceAccount = getServiceAccount();

  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `${serviceAccount.projectId}.appspot.com`,
  });
}

// Lazy initialization
let adminFirestore: ReturnType<typeof getFirestore> | null = null;
let adminStorage: ReturnType<typeof getStorage> | null = null;

export function getAdminFirestore() {
  if (!adminFirestore) {
    const app = getAdminApp();
    adminFirestore = getFirestore(app);
  }
  return adminFirestore;
}

export function getAdminStorage() {
  if (!adminStorage) {
    const app = getAdminApp();
    adminStorage = getStorage(app);
  }
  return adminStorage;
}
