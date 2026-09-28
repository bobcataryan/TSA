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
    id: "change-drop-deadline",
    title: "Change/drop deadline",
    date: "2026-10-10",
    description: "The deadline to change or drop an event is October 10.",
    href: "/deadlines/change-drop-deadline/",
    category: "Deadline",
  },
];
export const calendarInitialMonth = "2026-09";
