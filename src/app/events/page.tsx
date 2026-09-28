import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageIntro } from "@/components/ui/section-heading";
import { EventExplorer } from "@/components/events/event-explorer";
import { ActionLink } from "@/components/ui/action-link";
import { links } from "@/data/links";
import { events } from "@/data/events";
export const metadata: Metadata = { title: "Competitive Events" };
export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Competitive events"
        title="Find your next challenge."
        description="Explore your interests, find your team, and turn what you know into something you can show."
      />
      <section className="section">
        <div className="container">
          {events.some((event) => event.status === "Example") && (
            <div className="notice">
              <Info size={20} />
              <div>
                <strong>A starting point for exploring events.</strong>
                <p>
                  The entries below are examples, not confirmed Elkins
                  offerings. Team formats are illustrative; official rules,
                  sizes, and dates will be added after chapter confirmation. Use
                  the sign-up sheet for your actual event selections.
                </p>
              </div>
            </div>
          )}
          <EventExplorer />
          <div className="split-callout">
            <div>
              <h2>Found your direction?</h2>
              <p>
                Every member must sign up for at least one competitive event.
              </p>
            </div>
            <ActionLink href="/sign-ups" variant="primary">
              View Event Sign-Ups
            </ActionLink>
          </div>
          <div className="source-note">
            <span>Competition reference</span>
            <ActionLink href={links.nationalEvents}>
              National TSA event information
            </ActionLink>
            <p>
              Always follow the current event guide and chapter instructions.
              This directory does not replace official rules.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
