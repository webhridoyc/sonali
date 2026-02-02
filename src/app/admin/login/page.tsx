import { AdminLoginForm } from '@/app/admin/login/admin-login-form';

function sanitizeNext(nextValue: unknown): string {
  if (typeof nextValue !== 'string' || !nextValue) return '/admin';
  if (!nextValue.startsWith('/')) return '/admin';
  if (nextValue.startsWith('//')) return '/admin';
  return nextValue;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const nextUrl = sanitizeNext(resolved?.next);
  return <AdminLoginForm nextUrl={nextUrl} />;
}
