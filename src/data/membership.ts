import { links } from "./links";
import { parentAgreement } from "./resources";
export const membership = {
  deadline: "2026-09-30T23:59:00-05:00",
  deadlineLabel: "September 30 · 11:59 PM Central Time",
  steps: [
    {
      title: "Pay TSA dues",
      description: "$95 annual dues through RevTrak.",
      links: [{ label: "Pay dues", href: links.dues }],
    },
    {
      title: "Membership form",
      description: "Submit the 2026–27 membership form.",
      links: [{ label: "Open form", href: links.membership }],
    },
    {
      title: "Choose an event",
      description: "Sign up for at least one competitive event.",
      links: [{ label: "Event sign-ups", href: "/events#sign-ups" }],
    },
    {
      title: "Parent-Student Agreement",
      description: "Print, sign, scan, and upload your agreement.",
      links: [
        ...(parentAgreement
          ? [{ label: "Parent letter", href: parentAgreement.href }]
          : []),
        { label: "Upload agreement", href: links.parentUpload },
      ],
      note: parentAgreement ? undefined : "Parent letter PDF coming soon.",
    },
  ],
};
