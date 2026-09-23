import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { formatMeetingDate, nextAgenda, todayInChicago } from "@/lib/agendas";
import type { AgendaItem } from "@/lib/store";

/**
 * The Board Meetings page shows one agenda: the next meeting's. Nancy Chausow
 * Shafer asked for that in the round 2 review, in place of a list of every
 * agenda ever posted. 5 ILCS 120/2.02(a) requires the agenda to stay posted
 * until the meeting is concluded, so dropping it too early is a statutory
 * failure, not a cosmetic one.
 */

const agenda = (id: string, meetingDate: string): AgendaItem => ({
  id,
  title: `Agenda ${id}`,
  meetingDate,
});

describe("the next meeting's agenda", () => {
  const items = [
    agenda("past", "2026-09-09"),
    agenda("later", "2026-10-07"),
    agenda("next", "2026-09-23"),
  ];

  test("is the soonest meeting that has not yet passed", () => {
    const now = new Date("2026-09-22T15:00:00-05:00");
    assert.equal(nextAgenda(items, now)?.id, "next");
  });

  test("stays up for the whole day of the meeting", () => {
    // 11 p.m. in Chicago is already the next day in UTC, where the servers run.
    const lateOnMeetingDay = new Date("2026-09-23T23:00:00-05:00");
    assert.equal(todayInChicago(lateOnMeetingDay), "2026-09-23");
    assert.equal(nextAgenda(items, lateOnMeetingDay)?.id, "next");
  });

  test("moves on to the following meeting the day after", () => {
    const dayAfter = new Date("2026-09-24T08:00:00-05:00");
    assert.equal(nextAgenda(items, dayAfter)?.id, "later");
  });

  test("shows nothing, rather than an old agenda, when none is upcoming", () => {
    const afterAll = new Date("2026-12-01T12:00:00-06:00");
    assert.equal(nextAgenda(items, afterAll), undefined);
    assert.equal(nextAgenda([], afterAll), undefined);
  });

  test("ignores an agenda saved without a usable date", () => {
    const now = new Date("2026-09-22T12:00:00-05:00");
    assert.equal(nextAgenda([agenda("blank", "")], now), undefined);
  });

  test("formats the meeting date in the reader's language", () => {
    assert.match(formatMeetingDate("2026-09-23", "en"), /September 23, 2026/);
    assert.match(
      formatMeetingDate("2026-09-23", "es"),
      /23 de septiembre de 2026/,
    );
    assert.match(formatMeetingDate("2026-09-23", "ru"), /23 сентября 2026/);
  });
});
