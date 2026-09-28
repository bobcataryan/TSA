import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageIntro } from "@/components/ui/section-heading";
import { EventExplorer } from "@/components/events/event-explorer";
import { ActionLink } from "@/components/ui/action-link";
import { links, signupsConfig } from "@/data/links";
import { events } from "@/data/events";
import { meetings } from "@/data/resources";
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
                  These are examples, not confirmed Elkins offerings. Check the
                  chapter spreadsheet below for available events. Official rules
                  and team sizes will be added after chapter confirmation.
                </p>
              </div>
            </div>
          )}
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
                {meetings.map((meeting) => (
                  <ActionLink key={meeting.id} href={meeting.href}>
                    {meeting.title}
                  </ActionLink>
                ))}
              </li>
              <li>
                <strong>Sign up using the event form.</strong>
                <p>
                  Submit the event sign-up form for at least one competition.
                  Use the spreadsheet below to view all sign-ups and check your
                  name.
                </p>
                <ActionLink href={links.eventSignupForm}>
                  Sign up for events
                </ActionLink>
              </li>
            </ol>
          </section>
          <section
            id="sign-ups"
            className="signups-section"
            aria-labelledby="signups-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">TSA 26-27 Signups</p>
                <h2 id="signups-title">Event sign-ups</h2>
              </div>
              <div className="step-links">
                <ActionLink href={links.eventSignupForm} variant="primary">
                  Sign up for events
                </ActionLink>
                <ActionLink href={links.signups} variant="outline">
                  Open Full Spreadsheet
                </ActionLink>
              </div>
            </div>
            <div className="sheet-frame">
              <iframe
                src={signupsConfig.embedUrl}
                title="TSA 26-27 event sign-ups spreadsheet"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="sheet-note">
              If the sheet does not load or asks you to sign in,{" "}
              <a href={links.signups} target="_blank" rel="noopener noreferrer">
                open it in Google Sheets ↗
              </a>
              . Notice something incorrect? Message a TSA officer.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
