import type { Metadata } from "next";
import { ResourceStage } from "@/components/resources/resource-stage";
import { resourceGroups } from "@/data/resource-groups";

export const metadata: Metadata = {
  title: "Resources",
  description: "Official TSA links, Elkins TSA quicklinks, and chapter files.",
};

export default function ResourcesPage() {
  return (
    <>
      <h1 className="sr-only">Resources</h1>
      <ResourceStage groups={resourceGroups} />
    </>
  );
}
