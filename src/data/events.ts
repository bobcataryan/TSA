export interface TSAEvent {
  id: string;
  name: string;
  category: string;
  minTeamSize: number;
  maxTeamSize: number;
}

// Chapter-provided event names and people-per-team limits for 2026–27.
const eventDefinitions: [
  name: string,
  category: string,
  min: number,
  max: number,
][] = [
  ["Animatronics", "Engineering", 2, 3],
  ["Architectural Design", "Design", 2, 4],
  ["Artificial Intelligence", "Coding", 2, 2],
  ["Audio Podcasting", "Media", 1, 6],
  ["Automated Manufacturing Systems", "Engineering", 2, 3],
  ["Biotechnology Design", "Science", 2, 6],
  ["Board Game Design", "Design", 2, 4],
  ["Chapter Team", "Leadership", 6, 6],
  ["Children’s Stories", "Media", 1, 6],
  ["Computer-Aided Design (CAD), Architecture", "Design", 1, 1],
  ["Computer-Aided Design (CAD), Engineering", "Engineering", 1, 1],
  ["Cybersecurity", "Coding", 2, 4],
  ["Data Science and Analytics", "Coding", 2, 2],
  ["Debating Technological Issues", "Presentation", 2, 2],
  ["Digital Video Production", "Media", 1, 6],
  ["Dragster Design", "Engineering", 1, 1],
  ["Drone Challenge (UAV)", "Engineering", 2, 6],
  ["Engineering Design", "Engineering", 2, 4],
  ["Extemporaneous Speech", "Presentation", 1, 1],
  ["Fashion Design and Technology", "Design", 2, 4],
  ["Flight Endurance", "Engineering", 1, 1],
  ["Forensic Science", "Science", 2, 2],
  ["Future Technology and Engineering Teacher", "Presentation", 1, 1],
  ["Hybrid Racer XL", "Engineering", 2, 4],
  ["Interior Design", "Design", 2, 2],
  ["Manufacturing Prototype", "Engineering", 2, 6],
  ["Music Production", "Media", 1, 6],
  ["On Demand Video", "Media", 2, 6],
  ["Photographic Technology", "Media", 1, 1],
  ["Prepared Presentation", "Presentation", 1, 1],
  ["Promotional Design", "Design", 1, 1],
  ["Robotics", "Engineering", 2, 6],
  ["Software Development", "Coding", 2, 6],
  ["STEM Mass Media", "Media", 2, 3],
  ["Structural Design and Engineering", "Engineering", 2, 2],
  ["Technology Bowl", "Science", 3, 3],
  ["Technology Problem Solving", "Engineering", 2, 2],
  ["Transportation Modeling", "Design", 1, 1],
  ["Video Game Design", "Coding", 2, 6],
  ["Virtual Reality Simulation", "Coding", 1, 6],
  ["Vlogging", "Media", 2, 6],
  ["Webmaster", "Coding", 1, 6],
];

export const events: TSAEvent[] = eventDefinitions.map(
  ([name, category, minTeamSize, maxTeamSize]) => ({
    id: name
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, ""),
    name,
    category,
    minTeamSize,
    maxTeamSize,
  }),
);

export function teamSizeLabel(event: TSAEvent) {
  if (event.maxTeamSize === 1) return "1 person";
  if (event.minTeamSize === event.maxTeamSize)
    return `${event.maxTeamSize} people`;
  return `${event.minTeamSize}–${event.maxTeamSize} people`;
}

export function fitsTeamSize(event: TSAEvent, size: number) {
  return size >= event.minTeamSize && size <= event.maxTeamSize;
}
