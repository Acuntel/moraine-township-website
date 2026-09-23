/**
 * Does any word a sighted reader can see sit inside `box` right now?
 *
 * The floating Donate button asks this before it comes back on a phone. It
 * used to sample five points (the corners and the middle) and look at the
 * element under each one. A line of text that fell between those points was
 * never seen, so the button came back on top of words: a voter registration
 * link on /services, the pantry hours on /food-pantry, an email address in the
 * staff list on /about.
 *
 * So every text node's line boxes are compared with the box. A hit counts only
 * where the text is actually painted: words inside a closed <details>, a
 * visually hidden screen reader note, or any other clipped box are skipped,
 * because covering them covers nothing. The walk is a few milliseconds on a
 * throttled phone profile, and it runs only when scrolling settles or moves up.
 */
export type Box = { left: number; right: number; top: number; bottom: number };

const overlapOf = (a: Box, b: Box): Box => ({
  left: Math.max(a.left, b.left),
  right: Math.min(a.right, b.right),
  top: Math.max(a.top, b.top),
  bottom: Math.min(a.bottom, b.bottom),
});

/** More than a pixel each way, so text that only touches an edge is not a hit. */
const hasArea = (b: Box) => b.right - b.left > 1 && b.bottom - b.top > 1;

function isHidden(el: Element) {
  if (typeof el.checkVisibility === "function") {
    return !el.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true,
    });
  }
  // Older Safari: a closed <details> shows only its summary.
  const shut = el.closest("details:not([open])");
  if (shut && !el.closest("summary")) return true;
  return getComputedStyle(el).visibility === "hidden";
}

/** Cut the overlap down to what every clipping ancestor lets through. */
function visiblePart(el: Element, overlap: Box) {
  let part = overlap;
  for (
    let a: Element | null = el;
    a && a !== document.documentElement;
    a = a.parentElement
  ) {
    const s = getComputedStyle(a);
    if (
      s.overflowX === "visible" &&
      s.overflowY === "visible" &&
      s.clip === "auto"
    ) {
      continue;
    }
    part = overlapOf(part, a.getBoundingClientRect());
    if (!hasArea(part)) return part;
  }
  return part;
}

export function paintedTextUnder(box: Box, skip: Element) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.textContent?.trim()) continue;
    const el = node.parentElement;
    if (!el || skip.contains(el)) continue;

    range.selectNodeContents(node);
    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width === 0 || rect.height === 0) continue;
      const overlap = overlapOf(rect, box);
      if (!hasArea(overlap)) continue;
      if (isHidden(el)) break;
      if (hasArea(visiblePart(el, overlap))) return true;
    }
  }
  return false;
}
