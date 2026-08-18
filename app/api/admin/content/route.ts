import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest } from "@/lib/admin-auth";
import { readContent, writeContent, type SiteContent } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readContent());
}

export async function PUT(request: Request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const content = normalize(payload);
  if (!content) {
    return NextResponse.json({ error: "invalid_shape" }, { status: 400 });
  }

  try {
    await writeContent(content);

    // The public pages are statically generated, so without this a save would
    // not appear until the next deploy. Revalidating the localized layout
    // rebuilds every page that reads this content, in all three languages.
    revalidatePath("/[lang]", "layout");
    revalidatePath("/[lang]/news/[slug]", "page");

    return NextResponse.json({ ok: true });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "write_failed";
    return NextResponse.json(
      { error: reason },
      { status: reason === "CONTENT_STORE_NOT_CONFIGURED" ? 503 : 502 },
    );
  }
}

/**
 * The admin panel is trusted, but the request that reaches this route is still
 * just JSON from a browser. Coerce it into the expected shape rather than
 * writing whatever arrives straight into the store, so a malformed save cannot
 * break rendering on the public site.
 */
/** Keep an optional news translation only when it actually has content. */
function translation(key: "es" | "ru", value: unknown) {
  if (typeof value !== "object" || value === null) return {};
  const v = value as Record<string, unknown>;
  const title = typeof v.title === "string" ? v.title.slice(0, 300) : "";
  const summary = typeof v.summary === "string" ? v.summary.slice(0, 1000) : "";
  const body = typeof v.body === "string" ? v.body.slice(0, 50000) : "";
  if (!title && !summary && !body) return {};
  return { [key]: { title, summary, body } };
}

/** Keep an optional translated pantry list only when it is non-empty. */
function translatedList(key: "itemsEs" | "itemsRu", value: unknown) {
  if (!Array.isArray(value)) return {};
  const items = value
    .map((i) => (typeof i === "string" ? i.slice(0, 200) : ""))
    .filter(Boolean);
  return items.length ? { [key]: items } : {};
}

function normalize(input: unknown): SiteContent | null {
  if (typeof input !== "object" || input === null) return null;
  const raw = input as Record<string, unknown>;

  const str = (v: unknown, max = 20000) =>
    typeof v === "string" ? v.slice(0, max) : "";
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);

  return {
    news: arr(raw.news).map((n) => {
      const item = n as Record<string, unknown>;
      return {
        id:
          str(item.id, 80) || `news-${Math.random().toString(36).slice(2, 10)}`,
        slug: str(item.slug, 80),
        title: str(item.title, 300),
        summary: str(item.summary, 1000),
        body: str(item.body, 50000),
        date: str(item.date, 20),
        published: Boolean(item.published),
        ...(str(item.image, 1000) ? { image: str(item.image, 1000) } : {}),
        ...(str(item.imageAlt, 1000) ? { imageAlt: str(item.imageAlt, 1000) } : {}),
        ...translation("es", item.es),
        ...translation("ru", item.ru),
      };
    }),
    events: arr(raw.events).map((e) => {
      const item = e as Record<string, unknown>;
      return {
        id:
          str(item.id, 80) ||
          `event-${Math.random().toString(36).slice(2, 10)}`,
        title: str(item.title, 300),
        date: str(item.date, 20),
        time: str(item.time, 60),
        location: str(item.location, 300),
        description: str(item.description, 2000),
      };
    }),
    pantry: {
      updated: str((raw.pantry as Record<string, unknown>)?.updated, 20),
      items: arr((raw.pantry as Record<string, unknown>)?.items)
        .map((i) => str(i, 200))
        .filter(Boolean),
      ...translatedList("itemsEs", (raw.pantry as Record<string, unknown>)?.itemsEs),
      ...translatedList("itemsRu", (raw.pantry as Record<string, unknown>)?.itemsRu),
    },
    agendas: arr(raw.agendas).map((a) => {
      const item = a as Record<string, unknown>;
      return {
        id:
          str(item.id, 80) ||
          `agenda-${Math.random().toString(36).slice(2, 10)}`,
        title: str(item.title, 300),
        meetingDate: str(item.meetingDate, 20),
        url: str(item.url, 500),
        body: str(item.body, 50000),
      };
    }),
    photos: arr(raw.photos).map((p) => {
      const item = p as Record<string, unknown>;
      return {
        id:
          str(item.id, 80) ||
          `photo-${Math.random().toString(36).slice(2, 10)}`,
        url: str(item.url, 1000),
        alt: str(item.alt, 1000),
        caption: str(item.caption, 500),
      };
    }),
  };
}
