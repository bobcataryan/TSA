export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD, in Central Time
  time?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  category: "Deadline" | "Meeting" | "Competition" | "Other";
}
// Add chapter dates here. No backend or calendar service is needed.
export const calendarEvents: CalendarEvent[] = [
  {
    id: "parent-information-meeting",
    title: "Parent information meeting",
    date: "2026-09-28",
    time: "6:00–6:45 PM Central Time",
    description: "Join the parent information meeting on Microsoft Teams.",
    href: "https://teams.microsoft.com/meet/26033785974118?p=Ojwty4Dc35XF0tMwvQ",
    linkLabel: "Join meeting",
    category: "Meeting",
  },
  {
    id: "membership-deadline",
    title: "Membership deadline",
    date: "2026-09-30",
    time: "11:59 PM Central Time",
    description: "Complete all four membership steps. No exceptions.",
    href: "/deadlines/membership-deadline/",
    category: "Deadline",
  },
  {
    id: "officer-form-deadline",
    title: "Officer form sign-up deadline",
    date: "2026-10-01",
    description: "Officer form sign-ups are due October 1.",
    href: "/deadlines/officer-form-deadline/",
    category: "Deadline",
  },
  {
    id: "ideation-workshop",
    title: "Ideation Workshop",
    date: "2026-10-06",
    description:
      "Workshop focused on project ideation. Time and location to be announced.",
    category: "Meeting",
  },
  {
    id: "change-drop-deadline",
    title: "Change/drop deadline",
    date: "2026-10-10",
    description: "The deadline to change or drop an event is October 10.",
    href: "/deadlines/change-drop-deadline/",
    category: "Deadline",
  },
  {
    id: "ideation-deadline",
    title: "Ideation deadline",
    date: "2026-10-20",
    description:
      "Project ideation is due. The Materials Workshop is also today.",
    href: "/deadlines/ideation-deadline/",
    category: "Deadline",
  },
  {
    id: "materials-workshop",
    title: "Materials Workshop",
    date: "2026-10-20",
    description:
      "Workshop focused on project materials. Time and location to be announced.",
    category: "Meeting",
  },
  {
    id: "materials-deadline",
    title: "Materials deadline",
    date: "2026-11-16",
    description: "Project materials are due.",
    href: "/deadlines/materials-deadline/",
    category: "Deadline",
  },
  {
    id: "25-percent-checkpoint",
    title: "25% Checkpoint",
    date: "2026-12-01",
    description: "25% project completion checkpoint.",
    href: "/deadlines/25-percent-checkpoint/",
    category: "Deadline",
  },
  {
    id: "50-percent-checkpoint",
    title: "50% Checkpoint",
    date: "2026-12-15",
    description: "50% project completion checkpoint.",
    href: "/deadlines/50-percent-checkpoint/",
    category: "Deadline",
  },
  {
    id: "75-percent-checkpoint",
    title: "75% Checkpoint",
    date: "2027-01-11",
    description:
      "75% project completion checkpoint. In-house competition if necessary.",
    href: "/deadlines/75-percent-checkpoint/",
    category: "Deadline",
  },
  {
    id: "in-house-competition",
    title: "In-house competition (if necessary)",
    date: "2027-01-11",
    description:
      "An in-house competition will be held if necessary. Check with TSA leadership for confirmation.",
    category: "Competition",
  },
  {
    id: "project-submission-deadline",
    title: "Project submission deadline",
    date: "2027-01-26",
    description: "Final project submissions are due.",
    href: "/deadlines/project-submission-deadline/",
    category: "Deadline",
  },
];
export const calendarInitialMonth = "2026-09";
