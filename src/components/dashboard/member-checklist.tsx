"use client";
import { ListChecks } from "lucide-react";
import { membership } from "@/data/membership";
import { useClock } from "@/lib/use-clock";
import { ActionLink } from "@/components/ui/action-link";
export function MemberChecklist() {
  const now = useClock();
  const closed = now !== null && now >= new Date(membership.deadline).getTime();
  return (
    <aside
      className="membership-panel"
      id="checklist"
      aria-labelledby="checklist-title"
    >
      <div className="panel-eyebrow">
        <ListChecks size={16} /> Membership
      </div>
      <h2 id="checklist-title">Your four steps.</h2>
      <div className={`membership-due ${closed ? "closed" : ""}`}>
        <strong>
          {closed ? "Membership deadline passed" : "Complete all four by"}
        </strong>
        <span>{membership.deadlineLabel}</span>
      </div>
      <ol className="member-steps">
        {membership.steps.map((step, index) => (
          <li key={step.title}>
            <span className="step-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="step-links">
                {step.links.map((link) => (
                  <ActionLink key={link.href} href={link.href}>
                    {link.label}
                  </ActionLink>
                ))}
              </div>
              {step.note && <span className="missing-note">{step.note}</span>}
            </div>
          </li>
        ))}
      </ol>
      <p className="checklist-note">
        {closed
          ? "Contact TSA leadership on BAND with membership questions."
          : "All four steps are required. No exceptions."}
      </p>
    </aside>
  );
}
