import {
  CreditCard,
  FileCheck2,
  Users,
  FileSignature,
  Info,
} from "lucide-react";
import { links } from "@/data/links";
import { parentAgreement } from "@/data/resources";
import { ActionLink } from "@/components/ui/action-link";
import { MembershipTiming } from "@/components/ui/deadline";
const steps = [
  {
    title: "Pay TSA dues",
    detail: "Pay your annual TSA dues through FBISD RevTrak.",
    icon: CreditCard,
    links: [{ label: "Pay Dues", href: links.dues }],
  },
  {
    title: "Complete the membership form",
    detail: "Submit the official 2026–27 TSA membership form.",
    icon: FileCheck2,
    links: [{ label: "Open Membership Form", href: links.membership }],
  },
  {
    title: "Choose your competitive event",
    detail: "Every member must sign up for at least one TSA competitive event.",
    icon: Users,
    links: [
      { label: "View Sign-Ups", href: "/sign-ups" },
      { label: "Learn About Events", href: "/events" },
    ],
  },
  {
    title: "Parent-Student Agreement",
    detail:
      "Print and sign the agreement, scan the completed form, then upload it using the submission form. Google sign-in may be required.",
    icon: FileSignature,
    links: [
      ...(parentAgreement
        ? [{ label: "View Parent Letter", href: parentAgreement.href }]
        : []),
      { label: "Upload Signed Form", href: links.parentUpload },
    ],
  },
];
export function Checklist() {
  return (
    <section id="checklist" className="section checklist-section">
      <div className="container">
        <div className="checklist-heading">
          <div>
            <p className="eyebrow">01 / Your next move</p>
            <h2>
              Become an official
              <br />
              TSA member.
            </h2>
          </div>
          <div className="checklist-intro">
            <MembershipTiming
              expired={
                <p>
                  The membership deadline has passed. Contact a TSA officer with
                  questions about your membership.
                </p>
              }
            >
              <p>
                Four steps. One deadline.
                <br />
                Complete every step by{" "}
                <strong>September 30 at 11:59 PM Central Time.</strong>
              </p>
            </MembershipTiming>
            <span>
              <Info size={14} /> Your progress is not tracked on this website.
            </span>
          </div>
        </div>
        <ol className="checklist">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <div className="step-content">
                <div className="step-title">
                  <h3>{step.title}</h3>
                  {index === 0 && (
                    <span className="dues-price">
                      $95<span>/ year</span>
                    </span>
                  )}
                </div>
                <p>{step.detail}</p>
                <div className="step-links">
                  {step.links.map((link) => (
                    <ActionLink href={link.href} key={link.href}>
                      {link.label}
                    </ActionLink>
                  ))}
                  {index === 3 && !parentAgreement && (
                    <span className="unavailable">
                      Parent letter coming soon
                    </span>
                  )}
                </div>
              </div>
              <step.icon
                className="step-icon"
                size={24}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
        <div className="checklist-footnote">
          <span className="signal-dot" />
          <MembershipTiming
            expired={
              <p>
                <strong>
                  The September 30 membership deadline has passed.
                </strong>{" "}
                Contact TSA leadership through BAND.
              </p>
            }
          >
            <p>
              <strong>
                ALL FOUR ACTIONS MUST BE COMPLETED BY SEPTEMBER 30 AT 11:59 PM
                CENTRAL TIME.
              </strong>{" "}
              There are no exceptions.
            </p>
          </MembershipTiming>
        </div>
      </div>
    </section>
  );
}
