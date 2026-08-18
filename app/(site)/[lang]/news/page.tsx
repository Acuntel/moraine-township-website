import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedNews, publishedNews, readContent } from "@/lib/store";
import { Card, Container, PageHeader } from "@/components/Page";

// This page renders admin-editable content, so it revalidates on save and
// at worst every five minutes.
export const revalidate = 300;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const dict = getDictionary(params.lang);
  return buildMetadata({
    locale: params.lang,
    route: "/news",
    title: dict.home.newsHeading,
    description: dict.home.description,
  });
}

export default async function NewsPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const news = publishedNews(await readContent());

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={dict.home.newsHeading} />
      <Container>
        {news.length === 0 ? (
          <p className="text-ink-muted">{dict.home.newsEmpty}</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => {
              const n = localizedNews(item, locale);
              return (
              <li key={item.id}>
                <Card className="card-lift h-full">
                  <time
                    dateTime={item.date}
                    className="text-sm font-semibold uppercase tracking-wide text-brand-teal"
                  >
                    {item.date}
                  </time>
                  <h2 className="mt-2 text-xl font-bold">
                    <Link
                      className="underline-offset-4 hover:underline"
                      href={localePath(locale, `/news/${item.slug}`)}
                    >
                      {n.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-ink-muted">{n.summary}</p>
                  {!n.translated && dict.shared.untranslatedNote ? (
                    <p className="mt-2 text-xs italic text-ink-muted">
                      {dict.shared.untranslatedNote}
                    </p>
                  ) : null}
                </Card>
              </li>
              );
            })}
          </ul>
        )}
      </Container>
    </>
  );
}
