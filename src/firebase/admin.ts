import 'server-only';

import admin from 'firebase-admin';

export type AdminFirestoreStatus =
  | { ok: true; firestore: admin.firestore.Firestore }
  | { ok: false; reason: 'missing-credentials' | 'invalid-credentials' | 'init-failed'; details?: string };

type FirebaseAdminCredentials = {
  project_id: string;
  private_key: string;
  client_email: string;
};

function loadCredentials(): FirebaseAdminCredentials | null {
  const json = process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (json) {
    try {
      return JSON.parse(json) as FirebaseAdminCredentials;
    } catch {
      return null;
    }
  }

  const base64 = process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64;
  if (base64) {
    try {
      const decoded = Buffer.from(base64, 'base64').toString('utf8');
      return JSON.parse(decoded) as FirebaseAdminCredentials;
    } catch {
      return null;
    }
  }

  return null;
}

function ensureAdminApp(): admin.app.App | null {
  if (admin.apps.length) return admin.app();

  const credentials = loadCredentials();
  if (!credentials) return null;

  const projectId = credentials.project_id || process.env.FIREBASE_PROJECT_ID;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    }),
  });

  return admin.app();
}

export function getAdminFirestore(): admin.firestore.Firestore | null {
  const status = getAdminFirestoreStatus();
  return status.ok ? status.firestore : null;
}

export function getAdminFirestoreStatus(): AdminFirestoreStatus {
  const hasJson = Boolean(process.env.FIREBASE_ADMIN_CREDENTIALS);
  const hasBase64 = Boolean(process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64);

  const credentials = loadCredentials();
  if (!credentials) {
    if (hasJson || hasBase64) {
      return { ok: false, reason: 'invalid-credentials', details: 'Credentials env var is present but could not be parsed.' };
    }
    return { ok: false, reason: 'missing-credentials' };
  }

  try {
    if (!admin.apps.length) {
      const projectId = credentials.project_id || process.env.FIREBASE_PROJECT_ID;
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail: credentials.client_email,
          privateKey: credentials.private_key,
        }),
      });
    }

    return { ok: true, firestore: admin.firestore() };
  } catch (error) {
    return {
      ok: false,
      reason: 'init-failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function adminServerTimestamp(): admin.firestore.FieldValue {
  return admin.firestore.FieldValue.serverTimestamp();
}
