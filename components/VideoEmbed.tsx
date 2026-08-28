"use client";

import { useState } from "react";

/**
 * Click-to-play YouTube embed. Renders a local poster image until the visitor
 * presses play, so no third-party requests leave the page on load. The iframe
 * itself uses the privacy-enhanced youtube-nocookie.com host.
 */
export function VideoEmbed({
  videoId,
  title,
  posterSrc,
  posterAlt,
  playLabel,
}: {
  videoId: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-brand-mint/60 bg-ink shadow-card">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group relative block h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc}
            alt={posterAlt}
            width={480}
            height={270}
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal-dark/90 text-white shadow-card transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-1 h-8 w-8"
              >
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
