import Link from "next/link";
import { en } from "@/content/en";
import { Container } from "@/components/Page";

/**
 * A not-found under a dynamic [lang] segment cannot read the locale, so this
 * renders in English. Every other page carries the reader's language; this one
 * is the single exception, and it points straight back to the home page.
 */
export default function NotFound() {
  const t = en.notFound;
  return (
    <Container>
      <div className="mx-auto max-w-prose py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-teal">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t.heading}</h1>
        <p className="mt-4 text-lg text-ink-muted">{t.body}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-brand-teal-dark px-7 py-4 font-bold text-white transition hover:bg-brand-teal"
        >
          {t.cta}
        </Link>
      </div>
    </Container>
  );
}
