import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Password gate for the admin panel, reached from the small gray footer link.
 *
 * The password is a single shared secret held in ADMIN_PASSWORD, which is what
 * the Supervisor described wanting ("there's a password, I think it's like
 * whatever we decide"). The session cookie is an HMAC over an expiry stamp, so
 * a cookie cannot be forged without the secret and cannot outlive its window.
 *
 * This protects an editing surface for public information. It is not a system
 * of record and holds nothing confidential: General Assistance case data lives
 * with the Township, never here.
 */

const COOKIE = "moraine_admin";
const WINDOW_MS = 12 * 60 * 60 * 1000;

function secret(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

export function adminConfigured(): boolean {
  return Boolean(secret());
}

function sign(expiry: number, key: string): string {
  return createHmac("sha256", key).update(String(expiry)).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function issueToken(): string {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD_NOT_SET");
  const expiry = Date.now() + WINDOW_MS;
  return `${expiry}.${sign(expiry, key)}`;
}

export function verifyToken(token: string | undefined): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [rawExpiry, signature] = token.split(".");
  const expiry = Number(rawExpiry);
  if (!Number.isFinite(expiry) || expiry < Date.now() || !signature)
    return false;
  return safeEqual(signature, sign(expiry, key));
}

export function checkPassword(candidate: string): boolean {
  const key = secret();
  if (!key) return false;
  // Compare hashes so a length mismatch does not leak the secret's length.
  const a = createHmac("sha256", key).update(candidate).digest("hex");
  const b = createHmac("sha256", key).update(key).digest("hex");
  return safeEqual(a, b);
}

export function isAdminRequest(): boolean {
  return verifyToken(cookies().get(COOKIE)?.value);
}

export const ADMIN_COOKIE = COOKIE;
export const ADMIN_WINDOW_MS = WINDOW_MS;
