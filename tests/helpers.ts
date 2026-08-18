/**
 * Shared scaffolding for the test suite.
 *
 * Two things the tests need repeatedly: control over the environment (because
 * every feature on this site is gated on an environment variable, and the
 * behaviour when one is missing matters as much as the behaviour when it is
 * present), and a stand-in for fetch so that testing the mail path never sends
 * a real message to the Township.
 */

/** Run a function with a specific environment, then put the old one back. */
export async function withEnv(
  vars: Record<string, string | undefined>,
  fn: () => void | Promise<void>,
): Promise<void> {
  const previous: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(vars)) {
    previous[k] = process.env[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    await fn();
  } finally {
    for (const [k, v] of Object.entries(previous)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

export interface CapturedCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

export interface FetchStub {
  calls: CapturedCall[];
  restore: () => void;
}

/**
 * Replace global fetch. Records every call and answers with the given status.
 * Nothing in the suite is allowed to reach the network.
 */
export function stubFetch(
  response: { ok?: boolean; status?: number; body?: string } = {},
): FetchStub {
  const original = globalThis.fetch;
  const calls: CapturedCall[] = [];

  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    let body: Record<string, unknown> = {};
    try {
      body = JSON.parse(String(init.body ?? "{}"));
    } catch {
      body = {};
    }
    calls.push({
      url: String(input),
      method: init.method ?? "GET",
      headers: (init.headers ?? {}) as Record<string, string>,
      body,
    });
    const status = response.status ?? (response.ok === false ? 500 : 200);
    return {
      ok: response.ok ?? status < 400,
      status,
      text: async () => response.body ?? "",
      json: async () => JSON.parse(response.body ?? "{}"),
    };
  }) as unknown as typeof fetch;

  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

/** Build a Request the way a browser posts one of the site's forms. */
export function postJson(url: string, payload: unknown): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

/** Every leaf string in a nested dictionary, keyed by its dotted path. */
export function flatten(
  value: unknown,
  prefix = "",
  out: Record<string, string> = {},
): Record<string, string> {
  if (typeof value === "string") {
    out[prefix] = value;
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => flatten(item, `${prefix}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

/**
 * Run an async job over items a few at a time.
 *
 * The live suite checks 65 legacy URLs and a sample of documents. Fired all at
 * once with Promise.all that is a burst Vercel answers by throttling, and the
 * suite then reports the site as broken when the site is fine. A test that
 * fails for its own reasons is worse than no test, because the next real
 * failure gets waved through as "probably rate limiting again".
 */
export async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  job: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  async function worker(): Promise<void> {
    while (next < items.length) {
      const i = next;
      next += 1;
      out[i] = await job(items[i]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return out;
}
