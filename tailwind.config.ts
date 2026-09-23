import type { Config } from "tailwindcss";

/**
 * Two sources feed this palette.
 *
 * The neutrals are the warm cream set from the approved mock: #FDFBF7 ground,
 * #F5F0E8 alternate, warm brown-black text. That warmth is most of why the mock
 * read as softer than a clinical white site, and it carries no brand conflict.
 *
 * The colours are the Brand Kit: #01A667 green, #00757D and #005A60 teal.
 * #01A667 measures 3.05:1 on cream, fine as a graphic (1.4.11 wants 3:1) but
 * below the 4.5:1 that white text on it would need, so green-deep carries text.
 *
 * Every pair is measured in scripts/contrast.mjs, which fails the build on a
 * regression.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#01A667",
          "green-deep": "#018552",
          "green-light": "#66BB6A",
          teal: "#00757D",
          "teal-dark": "#005A60",
          mint: "#99D4AD",
          aqua: "#45B4A4",
        },
        // Warm neutrals carried over from the mock.
        cream: {
          DEFAULT: "#FDFBF7",
          alt: "#F5F0E8",
          deep: "#EFE7DA",
        },
        // Tinted panels (income-qualified services, notes, callouts). Twelve
        // components used bg-surface-alt before this token existed, so Tailwind
        // generated nothing and the panels rendered untinted. Same value as
        // cream-alt, whose text pairs contrast.mjs already measures.
        surface: {
          alt: "#F5F0E8",
        },
        ink: {
          DEFAULT: "#2A2520",
          muted: "#6B6156",
          // 2.96:1 on cream: borders and rules only, never text.
          faint: "#9C9285",
        },
        line: {
          DEFAULT: "#E8E0D4",
          light: "#F0EBE2",
        },
        // The approved mock's amber. #D4882A is 2.76:1 on cream, so it is a
        // decorative fill only. amber-deep carries white text (4.56:1) and
        // amber-light is legible only on the dark panel (4.72:1 on #005A60).
        amber: {
          DEFAULT: "#D4882A",
          deep: "#A9661A",
          light: "#F0C060",
        },
        // Full-bleed dark band. White reads 7.98:1 on it, amber-light 4.72:1.
        panel: {
          DEFAULT: "#005A60",
          deep: "#00464C",
        },
      },
      fontFamily: {
        // Merriweather for display, matching the approved mock. The Brand Kit
        // specifies Franklin Gothic, which stays on body and UI; the serif is a
        // deliberate deviation the client asked for by liking the mock.
        display: [
          "var(--font-merriweather)",
          "var(--font-merriweather-cyrillic)",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-franklin)",
          "var(--font-franklin-cyrillic)",
          "Libre Franklin",
          "Franklin Gothic Medium",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // Fluid display sizes, matched to the mock's serif scale, so headings
        // breathe instead of stepping between breakpoints.
        hero: [
          "clamp(2.4rem, 5vw, 3.9rem)",
          { lineHeight: "1.12", letterSpacing: "-0.018em" },
        ],
        title: [
          "clamp(1.9rem, 3.4vw, 2.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.012em" },
        ],
        section: [
          "clamp(1.8rem, 3.2vw, 2.6rem)",
          { lineHeight: "1.25", letterSpacing: "-0.01em" },
        ],
        stat: [
          "clamp(2.1rem, 3.6vw, 3rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
      },
      spacing: {
        section: "clamp(4rem, 10vw, 7.5rem)",
      },
      maxWidth: {
        content: "1200px",
        prose: "44rem",
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(42,37,32,.04), 0 1px 2px rgba(42,37,32,.06)",
        md: "0 4px 16px rgba(42,37,32,.06)",
        lg: "0 12px 40px rgba(42,37,32,.08)",
        xl: "0 24px 64px rgba(42,37,32,.12)",
        glow: "0 10px 30px -8px rgba(1,133,82,.45)",
      },
      transitionTimingFunction: {
        // The mock's easing. Long tail-out is what makes motion read as flowing
        // rather than mechanical.
        flow: "cubic-bezier(.22, 1, .36, 1)",
        bounce: "cubic-bezier(.34, 1.56, .64, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0) scale(.6)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateY(-72vh) scale(1.1)", opacity: "0" },
        },
        "rise-in": {
          "0%": { transform: "translateY(18px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "float-up": "float-up 3.4s ease-out forwards",
        "rise-in": "rise-in .7s cubic-bezier(.22,1,.36,1) both",
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
