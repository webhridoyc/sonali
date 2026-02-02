import { getAdminFirestoreStatus } from '@/firebase/admin';
import { AdminDashboard } from './admin-dashboard';

export const dynamic = 'force-dynamic';

type ContactInquiry = {
  id: string;
  name: string;
  phone: string;
  inquiry: string;
  submittedAt?: string;
  raw: Record<string, unknown>;
};

type MembershipApplication = {
  id: string;
  name: string;
  nameEn: string;
  phone: string;
  nid: string;
  presentAddressUpazila?: string;
  presentAddressDistrict?: string;
  submittedAt?: string;
  raw: Record<string, unknown>;
};

function toIso(value: unknown): string | undefined {
  // Firestore Timestamp (admin) has toDate()
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
    return (value as any).toDate().toISOString();
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return undefined;
}

function normalizeForUi(value: unknown): unknown {
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
    return toIso(value);
  }
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(normalizeForUi);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] = normalizeForUi(child);
    }
    return out;
  }
  return value;
}

export default async function AdminPage() {
  const status = getAdminFirestoreStatus();
  if (!status.ok) {
    return (
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          {status.reason === 'missing-credentials'
            ? 'Admin Firestore is not configured. Set FIREBASE_ADMIN_CREDENTIALS or FIREBASE_ADMIN_CREDENTIALS_BASE64 on the server to collect and view submissions.'
            : status.reason === 'invalid-credentials'
              ? 'Admin Firestore credentials look invalid. Re-check your FIREBASE_ADMIN_CREDENTIALS / FIREBASE_ADMIN_CREDENTIALS_BASE64 value and restart the server.'
              : 'Admin Firestore failed to initialize. Check your credentials and server logs.'}
        </p>

        {status.details ? (
          <p className="text-sm text-muted-foreground">
            Details: {status.details}
          </p>
        ) : null}
      </div>
    );
  }

  const db = status.firestore;

  let inquiriesSnap;
  let applicationsSnap;
  try {
    [inquiriesSnap, applicationsSnap] = await Promise.all([
      db.collection('contactInquiries').orderBy('submittedAt', 'desc').limit(2000).get(),
      db.collection('membershipApplications').orderBy('submittedAt', 'desc').limit(2000).get(),
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isFirestoreDisabled =
      message.includes('firestore.googleapis.com') ||
      message.includes('Cloud Firestore API has not been used') ||
      message.includes('PERMISSION_DENIED');

    return (
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          {isFirestoreDisabled
            ? 'Firestore is not enabled for this Google Cloud project yet. Enable the Cloud Firestore API and create a Firestore database, then retry.'
            : 'Failed to load submissions from Firestore. Check server configuration and permissions.'}
        </p>
        <p className="text-sm text-muted-foreground">Details: {message}</p>
        {isFirestoreDisabled ? (
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              1) Enable API: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=sanalisokal-d92a1
            </div>
            <div>
              2) Create Firestore database in Firebase Console → Firestore Database
            </div>
            <div>
              3) Wait a few minutes, restart the server, refresh /admin
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  const inquiries: ContactInquiry[] = inquiriesSnap.docs.map((d: any) => {
    const data = d.data() as any;
    return {
      id: d.id,
      name: String(data.name ?? ''),
      phone: String(data.phone ?? ''),
      inquiry: String(data.inquiry ?? ''),
      submittedAt: toIso(data.submittedAt),
      raw: normalizeForUi(data) as Record<string, unknown>,
    };
  });

  const applications: MembershipApplication[] = applicationsSnap.docs.map((d: any) => {
    const data = d.data() as any;
    return {
      id: d.id,
      name: String(data.name ?? ''),
      nameEn: String(data.nameEn ?? ''),
      phone: String(data.phone ?? ''),
      nid: String(data.nid ?? ''),
      presentAddressUpazila: data.presentAddressUpazila ? String(data.presentAddressUpazila) : undefined,
      presentAddressDistrict: data.presentAddressDistrict ? String(data.presentAddressDistrict) : undefined,
      submittedAt: toIso(data.submittedAt),
      raw: normalizeForUi(data) as Record<string, unknown>,
    };
  });

  return <AdminDashboard inquiries={inquiries} applications={applications} />;
}
