"use client";
import { ListChecks } from "lucide-react";
import { membership } from "@/data/membership";
import { links } from "@/data/links";
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
      <div className="membership-heading">
        <div className="panel-eyebrow">
          <ListChecks size={16} /> Membership / 2026–27
        </div>
        <h2 id="checklist-title">
          Make it official<span>.</span>
        </h2>
        <p>Four steps. One chapter.</p>
      </div>
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
            </div>
          </li>
        ))}
      </ol>
      <div className="membership-progress">
        <ActionLink href={links.membershipSheet}>
          Check membership progress
        </ActionLink>
        <p>
          See which membership steps you have completed in the membership sheet.
        </p>
      </div>
      <p className="checklist-note">
        {closed
          ? "Contact TSA leadership on BAND with membership questions."
          : "All four steps are required. No exceptions."}
      </p>
    </aside>
  );
}
