/**
 * Line icons for the service tiles, keyed by tile id. The mock leans on icon
 * chips rather than photographs to give each card a face, which is most of why
 * it reads as furnished without a photo library behind it.
 *
 * Every icon is decorative: the tile's own heading carries the meaning, so they
 * are hidden from assistive technology.
 */
export function TileIcon({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (id) {
    case "food-pantry":
      // Basket of groceries.
      return (
        <svg {...common}>
          <path d="M4 9h16l-1.3 9.3a2 2 0 0 1-2 1.7H7.3a2 2 0 0 1-2-1.7L4 9z" />
          <path d="M8.5 9 11 3.6M15.5 9 13 3.6M9.5 13v3M14.5 13v3" />
        </svg>
      );
    case "assistance":
      // Open hands offering support.
      return (
        <svg {...common}>
          <path d="M12 20.5c-3.4-2-6.5-4.6-6.5-8.2A3.5 3.5 0 0 1 12 9.8a3.5 3.5 0 0 1 6.5 2.5c0 3.6-3.1 6.2-6.5 8.2z" />
          <path d="M8 6.5 9.5 4M16 6.5 14.5 4M12 5.5V3" />
        </svg>
      );
    case "transportation":
      // Accessible van.
      return (
        <svg {...common}>
          <path d="M3 16V8.5A1.5 1.5 0 0 1 4.5 7h9l3.5 4h2.5A1.5 1.5 0 0 1 21 12.5V16" />
          <path d="M3 16h2M11 16h4M19 16h2" />
          <circle cx="7.5" cy="17.5" r="2" />
          <circle cx="17" cy="17.5" r="2" />
        </svg>
      );
    case "assessor":
      // House with a valuation tag.
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z" />
          <path d="M9.5 21v-5.5h5V21" />
        </svg>
      );
    case "services":
      // People at a counter.
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="2.8" />
          <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
          <path d="M16 7.5a2.6 2.6 0 0 1 0 5M17.5 19.5a5.4 5.4 0 0 0-2-4.2" />
        </svg>
      );
    case "get-involved":
      // Heart in a hand.
      return (
        <svg {...common}>
          <path d="M12 11.6c-1.2-1.7-3.6-1.6-4.5.3-.6 1.3 0 2.7 1 3.6l3.5 3.2 3.5-3.2c1-.9 1.6-2.3 1-3.6-.9-1.9-3.3-2-4.5-.3z" />
          <path d="M5 8.5V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
  }
}
