import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore } from '@/firebase/admin';

export const dynamic = 'force-dynamic';

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  const escaped = str.replace(/\r?\n/g, ' ').replace(/"/g, '""');
  return `"${escaped}"`;
}

function toIso(value: unknown): string {
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
    return (value as any).toDate().toISOString();
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return '';
}

function toCsvCellValue(value: unknown): string {
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
    return toIso(value);
  }
  if (value instanceof Date) return value.toISOString();
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  const db = getAdminFirestore();

  if (!db) {
    return NextResponse.json(
      { error: 'Admin Firestore is not configured.' },
      { status: 500 }
    );
  }

  if (type !== 'applications' && type !== 'inquiries') {
    return NextResponse.json({ error: 'Invalid type.' }, { status: 400 });
  }

  if (type === 'applications') {
    let snap;
    try {
      snap = await db.collection('membershipApplications').orderBy('submittedAt', 'desc').limit(2000).get();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json(
        { error: 'Failed to export applications from Firestore.', details: message },
        { status: 500 }
      );
    }
    const keySet = new Set<string>();
    const docs = snap.docs.map((d) => ({ id: d.id, data: (d.data() as Record<string, unknown>) ?? {} }));
    for (const doc of docs) {
      for (const key of Object.keys(doc.data)) keySet.add(key);
    }

    const keys = Array.from(keySet).sort();
    const header = ['id', ...keys];
    const rows = docs.map((doc) => [doc.id, ...keys.map((k) => toCsvCellValue(doc.data[k]))]);

    const csv = [header, ...rows].map((r) => r.map(csvEscape).join(',')).join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="applications.csv"',
      },
    });
  }

  let snap;
  try {
    snap = await db.collection('contactInquiries').orderBy('submittedAt', 'desc').limit(2000).get();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to export inquiries from Firestore.', details: message },
      { status: 500 }
    );
  }
  const keySet = new Set<string>();
  const docs = snap.docs.map((d) => ({ id: d.id, data: (d.data() as Record<string, unknown>) ?? {} }));
  for (const doc of docs) {
    for (const key of Object.keys(doc.data)) keySet.add(key);
  }

  const keys = Array.from(keySet).sort();
  const header = ['id', ...keys];
  const rows = docs.map((doc) => [doc.id, ...keys.map((k) => toCsvCellValue(doc.data[k]))]);

  const csv = [header, ...rows].map((r) => r.map(csvEscape).join(',')).join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="inquiries.csv"',
    },
  });
}
