"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { LOCALE_TAGS } from "@/lib/i18n";

/**
 * Read-aloud control, built on the browser's own speech synthesis. No API key,
 * no per-request cost, and it works offline once the page has loaded.
 *
 * It reads whatever is inside the element with id="main-content", skipping
 * navigation and controls, and speaks it in the language the page is in. The
 * Assessor map uses this to voice its long description, which is how an image
 * of a map stays usable for someone who cannot see it.
 */
export function ReadAloud({
  locale,
  labelStart,
  labelStop,
  labelUnsupported,
  /** Read this instead of the page body. Used by the boundary map. */
  text,
  className = "",
  onDark = false,
}: {
  locale: Locale;
  labelStart: string;
  labelStop: string;
  labelUnsupported: string;
  text?: string;
  className?: string;
  /** Inverts the control where it sits on the dark hero. */
  onDark?: boolean;
}) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  // Speech keeps running after a client-side navigation unless we stop it.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const collectPageText = useCallback(() => {
    const main = document.getElementById("main-content");
    if (!main) return "";
    const parts: string[] = [];
    main
      .querySelectorAll(
        "h1, h2, h3, h4, p, li, dt, dd, caption, figcaption, th, td",
      )
      .forEach((node) => {
        // Anything hidden from sighted readers should not be read either.
        if (node.closest('[aria-hidden="true"], [hidden]')) return;
        const value = node.textContent?.trim();
        if (value) parts.push(value);
      });
    return parts.join(". ");
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const start = useCallback(() => {
    const content = text ?? collectPageText();
    if (!content) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = LOCALE_TAGS[locale];
    utterance.rate = 0.95;

    // Prefer a voice that actually matches the page language, so the Spanish
    // and Russian pages are not read with an English voice.
    const voices = window.speechSynthesis.getVoices();
    const match =
      voices.find((v) => v.lang === LOCALE_TAGS[locale]) ??
      voices.find((v) => v.lang.startsWith(locale));
    if (match) utterance.voice = match;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }, [collectPageText, locale, text]);

  if (!supported) {
    return (
      <p className={`text-sm text-ink-muted ${className}`} role="note">
        {labelUnsupported}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={speaking ? stop : start}
      aria-pressed={speaking}
      className={`btn px-5 py-3 text-[0.85rem] ${
        onDark
          ? "btn-ghost-light"
          : "border border-line bg-white text-brand-teal-dark hover:-translate-y-0.5 hover:border-brand-green hover:shadow-md"
      } ${className}`}
    >
      <SpeakerIcon className="h-4 w-4" />
      {speaking ? labelStop : labelStart}
    </button>
  );
}

function SpeakerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zm-2.5-8.9v2.1a7 7 0 0 1 0 13.6v2.1a9 9 0 0 0 0-17.8z" />
    </svg>
  );
}
