import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedNews, publishedNews, readContent } from "@/lib/store";
import { Container, PageHeader } from "@/components/Page";

// News is edited in the admin panel, so this route resolves at request time
// rather than being frozen at build.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const item = publishedNews(await readContent()).find(
    (n) => n.slug === params.slug,
  );
  if (!item) return {};
  const n = localizedNews(item, params.lang);
  return buildMetadata({
    locale: params.lang,
    route: `/news/${params.slug}`,
    title: n.title,
    description: n.summary,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const item = publishedNews(await readContent()).find(
    (n) => n.slug === params.slug,
  );
  if (!item) notFound();
  const n = localizedNews(item, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        title={n.title}
        kicker={item.date}
      />
      <Container>
        {item.image ? (
          <figure className="mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.imageAlt ?? ""}
              className="w-full rounded-lg border border-line object-cover shadow-sm"
            />
          </figure>
        ) : null}
        <article className="prose-page max-w-prose">
          <p className="text-lg font-semibold text-ink">{n.summary}</p>
          {!n.translated && dict.shared.untranslatedNote ? (
            <p className="text-sm italic text-ink-muted">
              {dict.shared.untranslatedNote}
            </p>
          ) : null}
          {n.body
            .split("\n")
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </article>
        <Link
          className="link mt-8 inline-block font-semibold"
          href={localePath(locale, "/news")}
        >
          {dict.home.newsViewAll}
        </Link>
      </Container>
    </>
  );
}
