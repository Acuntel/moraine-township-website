"use client";

import { useEffect } from "react";

/**
 * Opens the document group a link points at, and any group around it, so an
 * old bookmark such as /foia#audit or /board-meetings#decennial lands on the
 * documents rather than on a closed box. Browsers do not open a closed details
 * element for a fragment on their own, and cannot scroll to anything inside one.
 */
export function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      let opened = false;
      for (
        let node: HTMLElement | null = target;
        node;
        node = node.parentElement
      ) {
        if (node instanceof HTMLDetailsElement && !node.open) {
          node.open = true;
          opened = true;
        }
      }
      if (opened) target.scrollIntoView({ block: "start" });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
