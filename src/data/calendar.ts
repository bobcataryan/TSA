export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD, in Central Time
  time?: string;
  description?: string;
  href?: string;
  category: "Deadline" | "Meeting" | "Competition" | "Other";
}
// Add chapter dates here. No backend or calendar service is needed.
export const calendarEvents: CalendarEvent[] = [
  {
    id: "membership-deadline",
    title: "Membership deadline",
    date: "2026-09-30",
    time: "11:59 PM Central Time",
    description: "Complete all four membership steps. No exceptions.",
    href: "/#checklist",
    category: "Deadline",
  },
];
export const calendarInitialMonth = "2026-09";
