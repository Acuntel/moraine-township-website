"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/types";

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  copy,
  requiredLabel,
}: {
  copy: Dictionary["contact"];
  requiredLabel: string;
}) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("send failed");
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* Announced to screen readers when it changes, so someone who cannot
          see the message still learns the outcome. */}
      <div role="status" aria-live="polite" className="sr-only">
        {state === "sent"
          ? copy.formSuccess
          : state === "error"
            ? copy.formError
            : ""}
      </div>

      <Field
        id="contact-name"
        name="name"
        label={copy.formName}
        required
        requiredLabel={requiredLabel}
        autoComplete="name"
      />
      <Field
        id="contact-email"
        name="email"
        label={copy.formEmail}
        type="email"
        required
        requiredLabel={requiredLabel}
        autoComplete="email"
      />
      <Field
        id="contact-phone"
        name="phone"
        label={copy.formPhone}
        type="tel"
        requiredLabel={requiredLabel}
        autoComplete="tel"
      />

      <label className="mt-5 block font-semibold" htmlFor="contact-message">
        {copy.formMessage}{" "}
        <span className="text-sm font-normal text-ink-muted">
          ({requiredLabel})
        </span>
      </label>
      <textarea
        id="contact-message"
        name="message"
        required
        rows={6}
        className="mt-1.5 w-full rounded-lg border border-ink-muted/40 px-3 py-2.5"
      />

      {/* Bots fill this; people never see it. */}
      <div
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 rounded-full bg-brand-teal-dark px-7 py-3.5 font-bold text-white transition hover:bg-brand-teal disabled:opacity-60"
      >
        {state === "sending" ? copy.formSending : copy.formSubmit}
      </button>

      {state === "sent" ? (
        <p className="mt-4 rounded-lg bg-surface-tint p-4 font-semibold text-brand-teal-dark">
          {copy.formSuccess}
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-4 rounded-lg border-l-4 border-red-700 bg-red-50 p-4 font-semibold text-red-900">
          {copy.formError}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  requiredLabel,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  requiredLabel: string;
  autoComplete?: string;
}) {
  return (
    <>
      <label className="mt-5 block font-semibold" htmlFor={id}>
        {label}{" "}
        {required ? (
          <span className="text-sm font-normal text-ink-muted">
            ({requiredLabel})
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-ink-muted/40 px-3 py-2.5"
      />
    </>
  );
}
