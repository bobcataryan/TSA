export interface TSAEvent {
  id: string;
  name: string;
  category: string;
  teamType: "Team" | "Individual" | "To be confirmed";
  maxTeamSize?: number;
  description: string;
  requirements: string[];
  importantDates: { label: string; date: string }[];
  resources: { label: string; href: string }[];
  status: "Example" | "Open" | "Closed" | "Details coming soon";
}
// These examples demonstrate the directory. They are NOT confirmed chapter offerings or rules.
// Replace with chapter-verified entries and update status when meeting documents are available.
export const events: TSAEvent[] = [
  {
    id: "software-development",
    name: "Software Development",
    category: "Coding",
    teamType: "Team",
    description:
      "Explore how code can solve a meaningful problem. Chapter availability and current rules are awaiting confirmation.",
    requirements: [],
    importantDates: [],
    resources: [],
    status: "Example",
  },
  {
    id: "engineering-design",
    name: "Engineering Design",
    category: "Engineering",
    teamType: "Team",
    description:
      "Explore a design challenge through research, prototyping, and iteration. Chapter availability and current rules are awaiting confirmation.",
    requirements: [],
    importantDates: [],
    resources: [],
    status: "Example",
  },
  {
    id: "prepared-presentation",
    name: "Prepared Presentation",
    category: "Presentation",
    teamType: "Individual",
    description:
      "Explore communicating a technical idea with clarity and confidence. Chapter availability and current rules are awaiting confirmation.",
    requirements: [],
    importantDates: [],
    resources: [],
    status: "Example",
  },
];
