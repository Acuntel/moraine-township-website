import type { Dictionary, OrgNode } from "@/content/types";
import { BODIES, type BodyMember } from "@/lib/bodies";

type Foia = Dictionary["foia"];

/**
 * The block diagram 5 ILCS 140/4(a) asks for, as a nested list. A list keeps
 * the hierarchy readable by a screen reader and reflows on a phone, which a
 * drawn diagram would not.
 */
export function OrgChart({ nodes }: { nodes: OrgNode[] }) {
  return (
    <ul className="mt-3 space-y-3 border-l-2 border-line pl-5">
      {nodes.map((node) => (
        <li key={node.label}>
          <p className="font-semibold text-brand-teal-dark">{node.label}</p>
          {node.detail ? (
            <p className="mt-0.5 text-[0.95rem] text-ink-muted">
              {node.detail}
            </p>
          ) : null}
          {node.children ? <OrgChart nodes={node.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

function roleText(member: BodyMember, roles: Foia["memberRoles"]) {
  if (!member.role) return null;
  return roles[member.role].replace("{year}", String(member.year ?? ""));
}

/** The membership of every body that governs or advises the Township. */
export function BodyRosters({ t }: { t: Foia }) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {BODIES.map((body) => (
        <div
          key={body.id}
          className="rounded-xl border border-line bg-white p-5"
        >
          <h3 id={`body-${body.id}`} className="text-lg font-bold">
            {t.bodyNames[body.id]}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{t.bodyNotes[body.id]}</p>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {body.members.map((member) => {
              const role = roleText(member, t.memberRoles);
              return (
                <li key={`${member.name}-${member.role ?? ""}`}>
                  <span className="font-semibold">{member.name}</span>
                  {role ? (
                    <span className="text-ink-muted">, {role}</span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
