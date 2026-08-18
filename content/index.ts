import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import { en } from "./en";
import { es } from "./es";
import { ru } from "./ru";

const DICTIONARIES: Record<Locale, Dictionary> = { en, es, ru };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
