"use client";

import { useEffect, useRef } from "react";

/**
 * Runs a callback whenever the resident comes back to this tab, and once on
 * mount.
 *
 * Both places this site needs to notice a return share one failure, and it is
 * the kind that never throws and never shows up in a build:
 *
 *   Tapping a `tel:` link hands off to the phone app. Clicking Donate opens
 *   PayPal in a new tab. In neither case is the Township page reloaded, so a
 *   `useEffect(..., [])` that reads localStorage runs once, before the thing it
 *   is waiting for has happened, and then never runs again. The prompt simply
 *   does not appear, and nothing anywhere reports a problem.
 *
 * `visibilitychange` catches the tab being switched back to and the phone app
 * being dismissed. `focus` catches window-level returns that fire no
 * visibility change, such as coming back from another application on desktop.
 * `pageshow` catches Safari restoring the page from its back/forward cache,
 * where no other event fires at all.
 *
 * The callback is held in a ref so a caller can pass an inline function without
 * tearing down and rebuilding the listeners on every render.
 */
export function useReturnToPage(
  onReturn: () => void,
  { runOnMount = true }: { runOnMount?: boolean } = {},
) {
  const callback = useRef(onReturn);
  callback.current = onReturn;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    /**
     * Deferred by a tick on purpose.
     *
     * `pageshow` with `persisted` set is Safari and Chrome restoring the page
     * from the back/forward cache, and Next's router listens for the same event
     * to resynchronise its own idea of the URL. Navigating straight out of the
     * handler raced that: the router finished restoring after the redirect had
     * been requested and put the old URL back, so the donor stayed exactly
     * where they were and the thank-you page never appeared. Yielding first
     * lets the router settle, and then the navigation sticks.
     */
    const run = () => {
      if (document.visibilityState !== "visible") return;
      timers.push(
        setTimeout(() => {
          if (document.visibilityState !== "visible") return;
          callback.current();
        }, 80),
      );
    };

    if (runOnMount) run();

    document.addEventListener("visibilitychange", run);
    window.addEventListener("focus", run);
    window.addEventListener("pageshow", run);
    return () => {
      document.removeEventListener("visibilitychange", run);
      window.removeEventListener("focus", run);
      window.removeEventListener("pageshow", run);
      for (const timer of timers) clearTimeout(timer);
    };
  }, [runOnMount]);
}
