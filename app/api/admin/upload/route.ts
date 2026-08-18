import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminRequest } from "@/lib/admin-auth";
import { STORE_CONFIGURED } from "@/lib/store";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

/**
 * Photo upload for the admin panel. The Supervisor asked to be able to "add and
 * take away images" herself, which needs a real upload rather than a field where
 * staff paste a URL to a file they have hosted somewhere else.
 *
 * Files land in Vercel Blob with a random suffix, so re-uploading a photo with
 * the same filename never silently replaces the one already published.
 */
export async function POST(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!STORE_CONFIGURED) {
    return NextResponse.json(
      { error: "CONTENT_STORE_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  // Keep a readable filename but strip anything that could confuse a path.
  const safeName = (file.name || "photo")
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-80);

  try {
    const blob = await put(`photos/${safeName}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url, name: safeName });
  } catch {
    return NextResponse.json({ error: "upload_failed" }, { status: 502 });
  }
}
