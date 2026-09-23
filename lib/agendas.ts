import type { AgendaItem } from "./store";

/**
 * Today's date in the Township's own time zone, as YYYY-MM-DD.
 *
 * The site is rendered on servers that run in UTC. Between 7 p.m. and midnight
 * Central, UTC is already tomorrow, so a plain `new Date().toISOString()` would
 * drop tonight's meeting agenda hours before the meeting starts.
 */
export function todayInChicago(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * The one agenda the Board Meetings page shows: the soonest meeting that is
 * today or later. Nancy Chausow Shafer asked in the round 2 review for the
 * next meeting's agenda only, not a list of prior ones. 5 ILCS 120/2.02(a)
 * requires a regular meeting's agenda to stay posted until that meeting is
 * concluded, and keeping it through the end of the meeting day satisfies that.
 */
export function nextAgenda(
  agendas: readonly AgendaItem[],
  now: Date = new Date(),
): AgendaItem | undefined {
  const today = todayInChicago(now);
  return agendas
    .filter((a) => /^\d{4}-\d{2}-\d{2}$/.test(a.meetingDate))
    .filter((a) => a.meetingDate >= today)
    .sort((a, b) => a.meetingDate.localeCompare(b.meetingDate))[0];
}

/** "September 23, 2026" in the reader's language, from YYYY-MM-DD. */
export function formatMeetingDate(value: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`));
  } catch {
    return value;
  }
}
