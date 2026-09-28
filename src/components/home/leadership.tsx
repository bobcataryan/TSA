import { ArrowUpRight } from "lucide-react";
import { links } from "@/data/links";
import { resources } from "@/data/resources";
import { ActionLink } from "@/components/ui/action-link";
import { DeadlineStatus } from "@/components/ui/deadline";
import { deadlines } from "@/data/deadlines";
export function Leadership() {
  const application =
    links.officerApplication ??
    resources.find(
      (resource) =>
        resource.category === "Leadership" &&
        /application/i.test(resource.title),
    )?.href;
  return (
    <section className="leadership-section" id="leadership">
      <div>
        <p className="eyebrow">Step forward</p>
        <h2>
          Interested in
          <br />
          leadership?
        </h2>
      </div>
      <div>
        <p>
          Officer positions are available to{" "}
          <strong>10th and 11th grade students.</strong> Help shape the year
          ahead.
        </p>
        <p className="leadership-date">Applications due October 1, 2026.</p>
        <DeadlineStatus deadline={deadlines[1]} />
        {application ? (
          <ActionLink href={application} variant="light">
            View Officer Application
          </ActionLink>
        ) : (
          <button className="button button-disabled" disabled>
            Application link coming soon
            <ArrowUpRight size={16} />
          </button>
        )}
      </div>
    </section>
  );
}
