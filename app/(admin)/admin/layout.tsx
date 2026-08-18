import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Moraine Township website admin",
  // An editing surface has no business in a search index.
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-alt">
        <a
          href="#admin-main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-teal-dark focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        <main id="admin-main">{children}</main>
      </body>
    </html>
  );
}
