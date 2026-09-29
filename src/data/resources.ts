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
  preview?: string;
}
const presentationDetails: Record<string, { title: string; preview: string }> =
  {
    "/documents/meetings/TSA%20Interest%20Meeting%20(1).pdf": {
      title: "TSA Interest Meeting",
      preview: "/images/resource-previews/meeting-01.png",
    },
    "/documents/meetings/Events.pdf": {
      title: "Events",
      preview: "/images/resource-previews/meeting-02.png",
    },
    "/documents/meetings/Final%20Sign-ups%20(1).pdf": {
      title: "Final Sign-ups",
      preview: "/images/resource-previews/meeting-03.png",
    },
  };
// Add curated entries here. Matching IDs override automatically discovered files.
const curated: Resource[] = [];
export const resources: Resource[] = [
  ...curated,
  ...(generated.resources as Resource[]).filter(
    (item) => !curated.some((entry) => entry.id === item.id),
  ),
].map((resource) => ({ ...resource, ...presentationDetails[resource.href] }));
export const parentAgreement = resources.find((item) => item.parentAgreement);
export const meetings = resources.filter(
  (item) => item.category === "Meetings",
);
