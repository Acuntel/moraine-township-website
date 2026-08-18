"use client";

import { useId } from "react";

/**
 * The Township mark: a green circle, a handshake that reads as a heart, the
 * name curved over the top and EST • 1850 beneath. Drawn as inline SVG rather
 * than loaded as a bitmap so it stays sharp, themes with the brand tokens, and
 * costs no extra request.
 */
export function Logo({
  className = "",
  title = "Moraine Township",
}: {
  className?: string;
  title?: string;
}) {
  // The mark appears in both the header and the footer, so the arc path
  // needs an id unique to each instance or the two collide (WCAG 4.1.1).
  const arcId = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={className}
      focusable="false"
    >
      <circle cx="60" cy="60" r="60" fill="#01A667" />

      <defs>
        <path id={arcId} d="M 18 62 A 42 42 0 0 1 102 62" fill="none" />
      </defs>
      <text
        fill="#FFFFFF"
        fontSize="13.5"
        fontWeight="700"
        letterSpacing="0.5"
        style={{ fontFamily: "var(--font-franklin), Arial, sans-serif" }}
      >
        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
          MORAINE TOWNSHIP
        </textPath>
      </text>

      {/* Handshake shaped into a heart. */}
      <g fill="#FFFFFF">
        <path d="M60 46.5c-3.6-4.6-9-6.2-13.6-4.1-5.3 2.4-7.5 8.6-5 13.7.5 1 1.1 1.9 1.9 2.6l4.6 4.3 4.2-3.9c1.4-1.3 3.6-1.3 5 0l1.1 1c.9.8 2.2.8 3.1 0 .9-.9.9-2.3 0-3.2l-4.6-4.3c-.8-.8-.9-2-.2-2.8.7-.9 2-1 2.9-.2l6.5 6c1.6 1.5 1.8 4 .4 5.7l-.6.7 3 2.8c1.5 1.4 3.8 1.3 5.2-.2l5.4-5.7c3.8-4 3.6-10.4-.5-14.2-4.3-4-11-3-14.8 1.8z" />
        <path d="M45.6 66.4l7.9 7.4c1.4 1.3 3.6 1.3 5 0 .6-.6 1-1.3 1.1-2.1.8.2 1.6.2 2.4 0 1.9-.5 3.2-2.2 3.2-4.1v-.4l-6.7-6.2c-.5-.4-1.2-.4-1.6 0l-4.2 3.9c-1.4 1.3-3.6 1.3-5 0z" />
      </g>

      <text
        x="60"
        y="98"
        fill="#FFFFFF"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.6"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-franklin), Arial, sans-serif" }}
      >
        EST • 1850
      </text>
    </svg>
  );
}
