export const ADMIN_SESSION_COOKIE = 'admin_session';

function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecodeToBytes(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '==='.slice((base64.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function utf8Encode(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function utf8Decode(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

async function hmacSha256(message: Uint8Array, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    utf8Encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sig = await crypto.subtle.sign('HMAC', key, message);
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  // Constant-time compare (best-effort, JS environment)
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export type AdminSessionPayload = {
  iat: number;
  exp: number;
};

export async function createAdminSessionToken(payload: AdminSessionPayload, secret: string): Promise<string> {
  const json = JSON.stringify(payload);
  const payloadPart = base64UrlEncodeBytes(utf8Encode(json));
  const sig = await hmacSha256(utf8Encode(payloadPart), secret);
  const sigPart = base64UrlEncodeBytes(sig);
  return `${payloadPart}.${sigPart}`;
}

export async function verifyAdminSessionToken(token: string, secret: string): Promise<AdminSessionPayload | null> {
  const [payloadPart, sigPart] = token.split('.');
  if (!payloadPart || !sigPart) return null;

  let payloadBytes: Uint8Array;
  let sigBytes: Uint8Array;
  try {
    payloadBytes = base64UrlDecodeToBytes(payloadPart);
    sigBytes = base64UrlDecodeToBytes(sigPart);
  } catch {
    return null;
  }

  const expectedSig = await hmacSha256(utf8Encode(payloadPart), secret);
  if (!timingSafeEqual(expectedSig, sigBytes)) return null;

  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(utf8Decode(payloadBytes)) as AdminSessionPayload;
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload?.iat || !payload?.exp) return null;
  if (payload.exp <= now) return null;

  return payload;
}
