import { links } from "./links";
export interface Announcement {
  id: string;
  title: string;
  date: string | null;
  category:
    | "Important"
    | "Membership"
    | "Competition"
    | "Meeting"
    | "Officer"
    | "General";
  summary: string;
  content: string[];
  pinned: boolean;
  links: { label: string; href: string }[];
  resourceIds: string[];
}
// The source announcement did not specify a publication date. Null avoids inventing one.
export const announcements: Announcement[] = [
  {
    id: "membership-requirements",
    title: "Your year starts with four steps.",
    date: null,
    category: "Membership",
    pinned: true,
    summary:
      "Planning to participate in TSA? Complete every membership requirement by September 30 at 11:59 PM Central Time. No exceptions.",
    content: [
      "All students planning to participate in TSA in any capacity must complete all four membership requirements: pay $95 in dues through RevTrak, submit the 2026–27 membership form, sign up for at least one competitive event, and print, sign, scan, and upload the Parent-Student Agreement.",
      "All four actions are due September 30, 2026 at 11:59 PM Central Time. There are no exceptions.",
      "Missed a meeting? Review the meeting presentations and PDFs in Resources as they become available. The events meeting contains competition information.",
      "Officer positions are available to 10th and 11th grade students. Applications are due October 1, 2026. The application link will be added when available.",
      "Questions? Message TSA leadership on BAND.",
    ],
    links: [
      { label: "Member checklist", href: "/#checklist" },
      { label: "Meeting files", href: "/resources#meetings" },
      { label: "Event sign-ups", href: links.signups },
    ],
    resourceIds: [],
  },
];
export const sortedAnnouncements = [...announcements].sort(
  (a, b) =>
    Number(b.pinned) - Number(a.pinned) ||
    (b.date ?? "").localeCompare(a.date ?? ""),
);
