"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type {
  AgendaItem,
  EventItem,
  NewsItem,
  NewsTranslation,
  PhotoItem,
  SiteContent,
} from "@/lib/store";

type Tab = "news" | "events" | "pantry" | "agendas" | "photos";

const TABS: { id: Tab; label: string; hint: string }[] = [
  {
    id: "news",
    label: "News",
    hint: "Headlines on the home page. Each item gets its own page, and can carry Spanish and Russian versions.",
  },
  {
    id: "events",
    label: "Meetings & events",
    hint: "The schedule of Board meetings and other dated events, shown on the Board & Meetings page.",
  },
  {
    id: "pantry",
    label: "Pantry list",
    hint: "The most needed items on the Food Pantry page. Usually updated in the middle of each month.",
  },
  {
    id: "agendas",
    label: "Agendas",
    hint: "The agenda for the next Board meeting. Illinois law requires this to be posted at least 48 hours ahead.",
  },
  {
    id: "photos",
    label: "Photos",
    hint: "Upload photographs here, then attach them to a news item. Every photo needs a description.",
  },
];

export function AdminEditor({
  initial,
  canSave,
}: {
  initial: SiteContent;
  canSave: boolean;
}) {
  const [tab, setTab] = useState<Tab>("news");
  const [content, setContent] = useState<SiteContent>(initial);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const update = useCallback((next: SiteContent) => {
    setContent(next);
    setDirty(true);
    setStatus("");
  }, []);

  // Losing an afternoon of edits to a stray tab close is the worst thing that
  // can happen in here, so the browser asks first.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "save_failed");
      }
      setDirty(false);
      setStatus("Saved. The public site now shows these changes.");
    } catch (error) {
      const reason = error instanceof Error ? error.message : "save_failed";
      setStatus(
        reason === "CONTENT_STORE_NOT_CONFIGURED"
          ? "Nothing was saved, because content storage is not connected yet."
          : "Nothing was saved. Please try again, or contact Brady if this keeps happening.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Content sections"
        className="flex flex-wrap gap-2"
      >
        {TABS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            id={`tab-${entry.id}`}
            aria-selected={tab === entry.id}
            aria-controls={`panel-${entry.id}`}
            onClick={() => setTab(entry.id)}
            className={
              tab === entry.id
                ? "rounded-full bg-brand-teal-dark px-5 py-2.5 text-sm font-bold text-white"
                : "rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-brand-teal-dark transition hover:bg-cream-alt"
            }
          >
            {entry.label}
          </button>
        ))}
      </div>

      <p className="mt-3 max-w-prose text-sm text-ink-muted">
        {TABS.find((t) => t.id === tab)?.hint}
      </p>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="mt-5 rounded-lg border border-line bg-white p-6"
      >
        {tab === "news" ? (
          <NewsEditor
            items={content.news}
            photos={content.photos}
            onChange={(news) => update({ ...content, news })}
          />
        ) : null}
        {tab === "events" ? (
          <EventsEditor
            items={content.events}
            onChange={(events) => update({ ...content, events })}
          />
        ) : null}
        {tab === "pantry" ? (
          <PantryEditor
            value={content.pantry}
            onChange={(pantry) => update({ ...content, pantry })}
          />
        ) : null}
        {tab === "agendas" ? (
          <AgendasEditor
            items={content.agendas}
            onChange={(agendas) => update({ ...content, agendas })}
          />
        ) : null}
        {tab === "photos" ? (
          <PhotosEditor
            items={content.photos}
            canUpload={canSave}
            onChange={(photos) => update({ ...content, photos })}
          />
        ) : null}
      </div>

      <div className="sticky bottom-0 mt-6 flex flex-wrap items-center gap-4 border-t border-line bg-cream py-4">
        <button
          type="button"
          onClick={save}
          disabled={saving || !canSave || !dirty}
          className="rounded-full bg-brand-green-deep px-7 py-3 font-bold text-white transition hover:bg-brand-teal-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving" : dirty ? "Save changes" : "Saved"}
        </button>
        {dirty && canSave ? (
          <p className="text-sm font-semibold text-amber-deep">
            You have unsaved changes.
          </p>
        ) : null}
        {!canSave ? (
          <p className="text-sm font-semibold text-amber-deep">
            Saving is disabled until content storage is connected.
          </p>
        ) : null}
        <p
          role="status"
          aria-live="polite"
          className="text-sm font-semibold text-brand-teal-dark"
        >
          {status}
        </p>
      </div>
    </div>
  );
}

function newId() {
  return `item-${Math.random().toString(36).slice(2, 10)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md border border-line p-4">{children}</div>;
}

function Text({
  label,
  value,
  onChange,
  type = "text",
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  help?: string;
}) {
  const id = useId();
  return (
    <div className="mt-3">
      <label className="block text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      {help ? (
        <p id={`${id}-help`} className="text-xs text-ink-muted">
          {help}
        </p>
      ) : null}
      <input
        id={id}
        type={type}
        value={value}
        aria-describedby={help ? `${id}-help` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-line px-3 py-2"
      />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 4,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  help?: string;
}) {
  const id = useId();
  return (
    <div className="mt-3">
      <label className="block text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      {help ? (
        <p id={`${id}-help`} className="text-xs text-ink-muted">
          {help}
        </p>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        value={value}
        aria-describedby={help ? `${id}-help` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-line px-3 py-2"
      />
    </div>
  );
}

function DeleteButton({
  onClick,
  label = "Remove",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm("Remove this permanently? This cannot be undone."))
          onClick();
      }}
      className="mt-3 text-sm font-semibold text-red-800 underline underline-offset-4"
    >
      {label}
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 rounded-full border-2 border-brand-teal-dark px-5 py-2.5 font-bold text-brand-teal-dark transition hover:bg-brand-teal-dark hover:text-white"
    >
      {label}
    </button>
  );
}

function NewsEditor({
  items,
  photos,
  onChange,
}: {
  items: NewsItem[];
  photos: PhotoItem[];
  onChange: (items: NewsItem[]) => void;
}) {
  const update = (i: number, patch: Partial<NewsItem>) =>
    onChange(
      items.map((item, index) => (index === i ? { ...item, ...patch } : item)),
    );

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-ink-muted">
          No news items yet. Add one and it will appear on the home page.
        </p>
      ) : null}

      {items.map((item, i) => (
        <Row key={item.id}>
          <Text
            label="Headline"
            value={item.title}
            onChange={(v) =>
              update(i, { title: v, slug: item.slug || slugify(v) })
            }
          />
          <Text
            label="Web address ending"
            help={`This item will live at /news/${item.slug || "your-headline"}`}
            value={item.slug}
            onChange={(v) => update(i, { slug: slugify(v) })}
          />
          <Text
            label="Date"
            type="date"
            value={item.date}
            onChange={(v) => update(i, { date: v })}
          />
          <Area
            label="Short summary shown on the home page"
            help="One or two sentences. This is what most people will read."
            value={item.summary}
            onChange={(v) => update(i, { summary: v })}
            rows={2}
          />
          <Area
            label="Full article"
            help="Leave a blank line between paragraphs."
            value={item.body}
            onChange={(v) => update(i, { body: v })}
            rows={6}
          />

          <PhotoPicker
            photos={photos}
            value={item.image}
            onChange={(image) => {
              const chosen = photos.find((p) => p.url === image);
              update(i, { image, imageAlt: chosen?.alt });
            }}
          />

          <Translation
            label="Spanish version (optional)"
            value={item.es}
            onChange={(es) => update(i, { es })}
          />
          <Translation
            label="Russian version (optional)"
            value={item.ru}
            onChange={(ru) => update(i, { ru })}
          />

          <label className="mt-4 flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={item.published}
              onChange={(e) => update(i, { published: e.target.checked })}
              className="h-4 w-4"
            />
            Show this on the website
          </label>
          <DeleteButton
            onClick={() => onChange(items.filter((_, index) => index !== i))}
          />
        </Row>
      ))}
      <AddButton
        label="Add a news item"
        onClick={() =>
          onChange([
            {
              id: newId(),
              slug: "",
              title: "",
              summary: "",
              body: "",
              date: today(),
              published: false,
            },
            ...items,
          ])
        }
      />
    </div>
  );
}

/** Attach an already-uploaded photo to a news item. */
function PhotoPicker({
  photos,
  value,
  onChange,
}: {
  photos: PhotoItem[];
  value?: string;
  onChange: (url: string | undefined) => void;
}) {
  const id = useId();
  // A photo with no description cannot be published, so it is not offered.
  const usable = photos.filter((p) => p.alt.trim());

  if (usable.length === 0) {
    return (
      <p className="mt-3 text-xs text-ink-muted">
        Upload a photo on the Photos tab, give it a description, and it will
        appear here.
      </p>
    );
  }
  return (
    <div className="mt-3">
      <label className="block text-sm font-semibold" htmlFor={id}>
        Photo (optional)
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="mt-1 w-full rounded-md border border-line px-3 py-2"
      >
        <option value="">No photo</option>
        {usable.map((photo) => (
          <option key={photo.id} value={photo.url}>
            {photo.alt}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Optional per-language version of a news item. Leaving it blank is fine: the
 * public page falls back to the original and tells the reader it has not been
 * translated, rather than hiding the item from them.
 */
function Translation({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: NewsTranslation;
  onChange: (v: NewsTranslation | undefined) => void;
}) {
  const current = value ?? { title: "", summary: "", body: "" };
  const set = (patch: Partial<NewsTranslation>) => {
    const next = { ...current, ...patch };
    onChange(next.title || next.summary || next.body ? next : undefined);
  };
  return (
    <details className="mt-4 rounded-md border border-line p-3">
      <summary className="cursor-pointer text-sm font-semibold">
        {label}
      </summary>
      <Text
        label="Headline"
        value={current.title}
        onChange={(v) => set({ title: v })}
      />
      <Area
        label="Short summary"
        rows={2}
        value={current.summary}
        onChange={(v) => set({ summary: v })}
      />
      <Area
        label="Full article"
        rows={5}
        value={current.body}
        onChange={(v) => set({ body: v })}
      />
    </details>
  );
}

function EventsEditor({
  items,
  onChange,
}: {
  items: EventItem[];
  onChange: (items: EventItem[]) => void;
}) {
  const update = (i: number, patch: Partial<EventItem>) =>
    onChange(
      items.map((item, index) => (index === i ? { ...item, ...patch } : item)),
    );

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-ink-muted">
          No events yet. The annual schedule of Board meetings belongs here.
        </p>
      ) : null}
      {items.map((item, i) => (
        <Row key={item.id}>
          <Text
            label="Event name"
            value={item.title}
            onChange={(v) => update(i, { title: v })}
          />
          <Text
            label="Date"
            type="date"
            value={item.date}
            onChange={(v) => update(i, { date: v })}
          />
          <Text
            label="Time"
            help="For example: 7:00 p.m."
            value={item.time ?? ""}
            onChange={(v) => update(i, { time: v })}
          />
          <Text
            label="Location"
            value={item.location ?? ""}
            onChange={(v) => update(i, { location: v })}
          />
          <Area
            label="Description"
            value={item.description ?? ""}
            onChange={(v) => update(i, { description: v })}
            rows={3}
          />
          <DeleteButton
            onClick={() => onChange(items.filter((_, index) => index !== i))}
          />
        </Row>
      ))}
      <AddButton
        label="Add an event"
        onClick={() =>
          onChange([...items, { id: newId(), title: "", date: today() }])
        }
      />
    </div>
  );
}

function PantryEditor({
  value,
  onChange,
}: {
  value: SiteContent["pantry"];
  onChange: (v: SiteContent["pantry"]) => void;
}) {
  const toList = (v: string) =>
    v
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  return (
    <div>
      <Text
        label="Date this list was updated"
        type="date"
        value={value.updated}
        onChange={(v) => onChange({ ...value, updated: v })}
      />
      <Area
        label="Most needed items, one per line"
        rows={9}
        value={value.items.join("\n")}
        onChange={(v) => onChange({ ...value, items: toList(v) })}
      />
      <Area
        label="Spanish list, one per line (optional)"
        help="Leave blank and Spanish readers see the English list."
        rows={9}
        value={(value.itemsEs ?? []).join("\n")}
        onChange={(v) => {
          const items = toList(v);
          onChange({ ...value, itemsEs: items.length ? items : undefined });
        }}
      />
      <Area
        label="Russian list, one per line (optional)"
        help="Leave blank and Russian readers see the English list."
        rows={9}
        value={(value.itemsRu ?? []).join("\n")}
        onChange={(v) => {
          const items = toList(v);
          onChange({ ...value, itemsRu: items.length ? items : undefined });
        }}
      />
    </div>
  );
}

function AgendasEditor({
  items,
  onChange,
}: {
  items: AgendaItem[];
  onChange: (items: AgendaItem[]) => void;
}) {
  const update = (i: number, patch: Partial<AgendaItem>) =>
    onChange(
      items.map((item, index) => (index === i ? { ...item, ...patch } : item)),
    );

  return (
    <div className="space-y-4">
      <p className="rounded-md bg-cream-alt p-4 text-sm leading-relaxed">
        Illinois law requires the agenda for a regular meeting to be posted at
        least 48 hours before the meeting, and to stay available for that whole
        period. Type the agenda into the text box so it can be read on the page
        and read aloud. Attaching the PDF as well is fine, but the text is what
        makes it accessible.
      </p>
      {items.map((item, i) => (
        <Row key={item.id}>
          <Text
            label="Title"
            value={item.title}
            onChange={(v) => update(i, { title: v })}
          />
          <Text
            label="Meeting date"
            type="date"
            value={item.meetingDate}
            onChange={(v) => update(i, { meetingDate: v })}
          />
          <Area
            label="Agenda text"
            rows={9}
            value={item.body ?? ""}
            onChange={(v) => update(i, { body: v })}
          />
          <Text
            label="Link to the PDF (optional)"
            value={item.url ?? ""}
            onChange={(v) => update(i, { url: v })}
          />
          <DeleteButton
            onClick={() => onChange(items.filter((_, index) => index !== i))}
          />
        </Row>
      ))}
      <AddButton
        label="Add an agenda"
        onClick={() =>
          onChange([
            {
              id: newId(),
              title: "Agenda, next Board meeting",
              meetingDate: today(),
              body: "",
            },
            ...items,
          ])
        }
      />
    </div>
  );
}

function PhotosEditor({
  items,
  canUpload,
  onChange,
}: {
  items: PhotoItem[];
  canUpload: boolean;
  onChange: (items: PhotoItem[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const update = (i: number, patch: Partial<PhotoItem>) =>
    onChange(
      items.map((item, index) => (index === i ? { ...item, ...patch } : item)),
    );

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    const added: PhotoItem[] = [];
    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("file", file);
      try {
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });
        const data = (await response.json()) as {
          url?: string;
          error?: string;
        };
        if (!response.ok || !data.url) {
          setError(
            data.error === "too_large"
              ? `${file.name} is larger than 8 MB. Please use a smaller file.`
              : data.error === "unsupported_type"
                ? `${file.name} is not an image we can use. Try JPG, PNG or WEBP.`
                : `${file.name} could not be uploaded.`,
          );
          continue;
        }
        added.push({ id: newId(), url: data.url, alt: "" });
      } catch {
        setError(`${file.name} could not be uploaded.`);
      }
    }
    if (added.length) onChange([...items, ...added]);
    if (inputRef.current) inputRef.current.value = "";
    setBusy(false);
  }

  return (
    <div className="space-y-4">
      <p className="rounded-md bg-cream-alt p-4 text-sm leading-relaxed">
        Every photo needs a description. It is read aloud to people who use a
        screen reader, and the Township is required to provide it. Describe what
        is happening in the picture, not the file name. A photo with no
        description will not be offered for use elsewhere.
      </p>

      <div>
        <label className="block text-sm font-semibold" htmlFor={inputId}>
          Upload photographs
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          disabled={!canUpload || busy}
          onChange={(e) => upload(e.target.files)}
          className="mt-1 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-brand-teal-dark file:px-5 file:py-2.5 file:font-semibold file:text-white disabled:opacity-50"
        />
        <p className="mt-1 text-xs text-ink-muted">
          JPG, PNG, WEBP, GIF or AVIF. Up to 8 MB each. You can select several
          at once.
        </p>
        {busy ? (
          <p className="mt-2 text-sm font-semibold text-brand-teal-dark">
            Uploading…
          </p>
        ) : null}
        <div
          role="alert"
          aria-live="assertive"
          className="mt-2 text-sm font-semibold text-red-800"
        >
          {error}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-ink-muted">No photographs uploaded yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.id}>
              <Row>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt || "Photograph with no description yet"}
                  className="h-40 w-full rounded-md object-cover"
                />
                <Area
                  label="Description of the photo"
                  rows={2}
                  value={item.alt}
                  onChange={(v) => update(i, { alt: v })}
                />
                {!item.alt.trim() ? (
                  <p className="mt-1 text-xs font-semibold text-amber-deep">
                    This photo still needs a description.
                  </p>
                ) : null}
                <Text
                  label="Caption (optional)"
                  value={item.caption ?? ""}
                  onChange={(v) => update(i, { caption: v })}
                />
                <DeleteButton
                  label="Remove photo"
                  onClick={() =>
                    onChange(items.filter((_, index) => index !== i))
                  }
                />
              </Row>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
