import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/section-heading";
import { EventExplorer } from "@/components/events/event-explorer";
import { ActionLink } from "@/components/ui/action-link";
import { links } from "@/data/links";
export const metadata: Metadata = { title: "Competitive Events" };
export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Competitive events"
        title="Find your event."
        description="42 ways to put your ideas to work. Find your fit, build your team, and get started."
        number="02"
      />
      <section className="section">
        <div className="container">
          <EventExplorer />
          <section className="event-guide" aria-labelledby="event-guide-title">
            <h2 id="event-guide-title">How to find event information</h2>
            <ol>
              <li>
                <strong>Explore the events.</strong>
                <p>
                  Use the search and filters above to find a competition area
                  that interests you.
                </p>
              </li>
              <li>
                <strong>Check the official requirements.</strong>
                <p>
                  Look up your event in the current TSA guide for its rules and
                  deliverables. Confirm chapter instructions with an officer.
                </p>
                <ActionLink href={links.nationalEvents}>
                  National TSA event information
                </ActionLink>
                <ActionLink href="/documents/meetings/Events.pdf">
                  Events PowerPoint
                </ActionLink>
              </li>
            </ol>
          </section>
        </div>
      </section>
    </>
  );
}
