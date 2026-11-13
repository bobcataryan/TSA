export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  category: "Deadline" | "Meeting" | "Competition" | "Conference";
}

export const calendarEvents: CalendarEvent[] = [
  {
    id: "project-building-meeting",
    title: "Project building meeting",
    date: "2026-11-17",
    description: "Bring your project plan and current questions.",
    category: "Meeting",
  },
  {
    id: "ideation-deadline",
    title: "Ideation deadline",
    date: "2026-11-24",
    description: "Finalize and submit your project direction.",
    category: "Deadline",
  },
  {
    id: "25-percent-checkpoint",
    title: "25% checkpoint",
    date: "2026-12-01",
    description: "Show an initial build, outline, or prototype.",
    category: "Deadline",
  },
  {
    id: "50-percent-checkpoint",
    title: "50% checkpoint",
    date: "2026-12-15",
    description: "Demonstrate substantial project progress.",
    category: "Deadline",
  },
  {
    id: "75-percent-checkpoint",
    title: "75% checkpoint and in-house competition",
    date: "2027-01-19",
    description: "Run the project at competition readiness.",
    category: "Competition",
  },
  {
    id: "project-submission-deadline",
    title: "Project submission deadline",
    date: "2027-01-26",
    description: "Submit the finished project package.",
    category: "Deadline",
  },
  {
    id: "regional-conference",
    title: "Regional conference",
    date: "2027-02-12",
    endDate: "2027-02-13",
    description: "Gulf Coast TSA Regional Conference.",
    category: "Conference",
  },
  {
    id: "state-conference",
    title: "State conference",
    date: "2027-04-19",
    endDate: "2027-04-22",
    description: "Texas TSA State Conference.",
    category: "Conference",
  },
  {
    id: "national-conference",
    title: "National conference",
    date: "2027-06-23",
    endDate: "2027-06-27",
    description: "National TSA Conference.",
    category: "Conference",
  },
];

export const calendarInitialMonth = "2026-11";
