import { links } from "./links";
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
      links: [
        { label: "Sign up for events", href: links.eventSignupForm },
        { label: "View event sign-ups", href: links.signups },
      ],
    },
    {
      title: "Parent-Student Agreement",
      description: "Print, sign, scan, and upload your agreement.",
      links: [
        { label: "Get agreement file", href: links.parentAgreement },
        { label: "Upload agreement", href: links.parentUpload },
      ],
    },
  ],
};
