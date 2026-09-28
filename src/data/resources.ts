import generated from "./assets.generated.json";
export type ResourceCategory =
  "Getting Started" | "Meetings" | "Competitions" | "Leadership";
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  href: string;
  type: string;
  date?: string;
  latest?: boolean;
  parentAgreement?: boolean;
}
// Add curated entries here. Matching IDs override automatically discovered files.
const curated: Resource[] = [];
export const resources: Resource[] = [
  ...curated,
  ...(generated.resources as Resource[]).filter(
    (item) => !curated.some((entry) => entry.id === item.id),
  ),
];
export const parentAgreement = resources.find((item) => item.parentAgreement);
export const meetings = resources.filter(
  (item) => item.category === "Meetings",
);
