export interface Deadline {
  id: string;
  title: string;
  date: string;
  precision: "minute" | "day";
  label: string;
  description: string;
  href: string;
}
export const deadlines: Deadline[] = [
  {
    id: "membership",
    title: "Membership completion",
    date: "2026-09-30T23:59:00-05:00",
    precision: "minute",
    label: "September 30, 2026 · 11:59 PM Central Time",
    description: "All four membership requirements. No exceptions.",
    href: "/#checklist",
  },
  {
    id: "officers",
    title: "Officer applications",
    date: "2026-10-01",
    precision: "day",
    label: "October 1, 2026 · Central Time",
    description:
      "Open to 10th and 11th grade students. A cutoff time has not been provided.",
    href: "/about#leadership",
  },
];
export const membershipDeadline = deadlines[0];
