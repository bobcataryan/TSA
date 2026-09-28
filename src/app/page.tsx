import Link from "next/link";
import { deadlineCalendarParts } from "@/lib/deadlines";
import {
  ArrowUpRight,
  ArrowRight,
  Pin,
  CreditCard,
  ClipboardList,
  Users,
  FileSignature,
  Files,
} from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Brand } from "@/components/ui/brand";
import { DeadlineStatus, MembershipTiming } from "@/components/ui/deadline";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Checklist } from "@/components/home/checklist";
import { Leadership } from "@/components/home/leadership";
import {
  ResourceList,
  MissingFiles,
} from "@/components/resources/resource-list";
import { EventCard } from "@/components/events/event-explorer";
import { links } from "@/data/links";
import { deadlines, membershipDeadline } from "@/data/deadlines";
import { sortedAnnouncements } from "@/data/announcements";
import { meetings } from "@/data/resources";
import { events } from "@/data/events";
const quickLinks = [
  {
    label: "Pay Dues",
    hint: "$95 annual dues",
    href: links.dues,
    icon: CreditCard,
  },
  {
    label: "Membership Form",
    hint: "Make it official",
    href: links.membership,
    icon: ClipboardList,
  },
  {
    label: "Event Sign-Ups",
    hint: "Find your challenge",
    href: "/sign-ups",
    icon: Users,
  },
  {
    label: "Parent Agreement",
    hint: "Print. Sign. Upload.",
    href: "/resources#parent-agreement",
    icon: FileSignature,
  },
  {
    label: "Meeting Files",
    hint: "Catch up here",
    href: "/resources#meetings",
    icon: Files,
  },
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="signal-dot" />
              <span>ELKINS HIGH SCHOOL TSA</span>
              <span className="year-label">2026—2027</span>
            </div>
            <h1>
              Build.
              <br />
              Compete.
              <br />
              <span>Lead.</span>
            </h1>
            <p className="hero-description">
              Big ideas. Real possibilities.
              <br />
              <span>
                Your central hub for meetings, competitions,
                <br className="desktop-break" /> membership, resources, and
                announcements.
              </span>
            </p>
            <div className="hero-actions">
              <ActionLink href="/#checklist" variant="primary">
                View Member Checklist
              </ActionLink>
              <ActionLink href="/events" variant="outline">
                Explore Events
              </ActionLink>
            </div>
            <ActionLink
              href="/announcements#membership-requirements"
              className="hero-latest"
            >
              Latest announcement
            </ActionLink>
          </div>
          <div className="hero-visual">
            <div className="technical-top">
              <span>ELKINS / CHAPTER HUB</span>
              <span>EST. FOR WHAT’S NEXT</span>
            </div>
            <div className="hero-brand-composition">
              <span className="blueprint-cross cross-one" aria-hidden="true">
                +
              </span>
              <Brand large />
              <span className="hero-brand-caption">
                TECHNOLOGY
                <br />
                STUDENT ASSOCIATION
              </span>
              <span className="blueprint-cross cross-two" aria-hidden="true">
                +
              </span>
            </div>
            <div className="hero-year" aria-hidden="true">
              26<span>/</span>27
            </div>
            <div className="hero-countdown">
              <div className="hero-countdown-label">
                <span className="signal-dot" />
                <MembershipTiming expired={<span>MEMBERSHIP CLOSED</span>}>
                  <span>YOUR NEXT DEADLINE</span>
                </MembershipTiming>
              </div>
              <div className="hero-countdown-body">
                <div>
                  <strong>September 30</strong>
                  <span>11:59 PM · Central Time</span>
                </div>
                <DeadlineStatus deadline={membershipDeadline} large />
              </div>
              <p>All four requirements. No exceptions.</p>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>CREATIVITY. TECHNICAL SKILL. LEADERSHIP.</span>
          <span>
            THE NEXT CHAPTER STARTS WITH YOU <ArrowUpRight size={14} />
          </span>
        </div>
      </section>
      <div className="quick-access container" aria-label="Quick access">
        {quickLinks.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            target={item.href.startsWith("https") ? "_blank" : undefined}
            rel={
              item.href.startsWith("https") ? "noopener noreferrer" : undefined
            }
          >
            <item.icon size={20} strokeWidth={1.5} />
            <div>
              <strong>{item.label}</strong>
              <span>{item.hint}</span>
            </div>
            {item.href.startsWith("https") ? (
              <ArrowUpRight size={15} aria-label="opens in a new tab" />
            ) : (
              <ArrowRight size={15} />
            )}
          </Link>
        ))}
      </div>
      <div className="container">
        <aside className="urgent-note">
          <span className="urgent-label">
            <Pin size={15} /> THE IMPORTANT PART
          </span>
          <p>
            <MembershipTiming
              expired={
                <>
                  Membership closed September 30.{" "}
                  <strong>Questions? Contact TSA leadership on BAND.</strong>
                </>
              }
            >
              Joining TSA this year?{" "}
              <strong>All four membership requirements are mandatory.</strong>
            </MembershipTiming>
          </p>
          <Link href="/announcements#membership-requirements">
            Read announcement
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
      <Reveal>
        <Checklist />
      </Reveal>
      <section className="section deadlines-section">
        <div className="container">
          <SectionHeading
            number="02"
            eyebrow="On your radar"
            title="Dates that matter."
          />
          <div className="deadline-list">
            {deadlines.map((deadline) => (
              <article className="deadline-row" key={deadline.id}>
                <div className="date-block">
                  <span>{deadlineCalendarParts(deadline).month}</span>
                  <strong>{deadlineCalendarParts(deadline).day}</strong>
                </div>
                <div className="deadline-info">
                  <h3>{deadline.title}</h3>
                  <p>{deadline.label}</p>
                  <span>{deadline.description}</span>
                </div>
                <DeadlineStatus deadline={deadline} />
                <Link
                  href={deadline.href}
                  className="circle-link"
                  aria-label={`View ${deadline.title}`}
                >
                  <ArrowUpRight size={22} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            number="03"
            eyebrow="Stay in the loop"
            title="From the chapter."
            href="/announcements"
            link="All announcements"
          />
          {sortedAnnouncements.slice(0, 3).map((announcement) => (
            <Link
              href={`/announcements#${announcement.id}`}
              className="announcement-preview"
              key={announcement.id}
            >
              <div className="announcement-preview-label">
                {announcement.pinned && (
                  <span className="tag tag-red">
                    <Pin size={12} />
                    Pinned
                  </span>
                )}
                <span>{announcement.category}</span>
              </div>
              <div>
                <h3>{announcement.title}</h3>
                <p>{announcement.summary}</p>
              </div>
              <span className="circle-link">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section events-preview-section">
        <div className="container">
          <SectionHeading
            number="04"
            eyebrow="Find your challenge"
            title="Different skills. Same ambition."
            href="/events"
            link="Explore events"
          />
          <p className="section-description">
            From your first line of code to your next big idea. Explore a few
            examples of TSA competition areas.
          </p>
          <div className="event-grid">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <p className="small-note">
            Examples only. Confirm available events and register through the{" "}
            <Link href="/sign-ups">
              chapter sign-up sheet <ArrowRight size={13} />
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            number="05"
            eyebrow="Everything in one place"
            title="Missed a meeting? Start here."
            href="/resources"
            link="All resources"
          />
          {meetings.length ? (
            <ResourceList items={meetings.slice(0, 2)} />
          ) : (
            <MissingFiles meeting />
          )}
        </div>
      </section>
      <div className="container">
        <Reveal>
          <Leadership />
        </Reveal>
      </div>
      <section className="section about-preview">
        <div className="container">
          <p className="eyebrow">More than a competition</p>
          <div>
            <h2>
              A place for the
              <br />
              ideas you haven’t built.<span> Yet.</span>
            </h2>
            <div>
              <p>
                Technology Student Association brings students together through
                STEM, engineering, design, presentation, and leadership. At
                Elkins, your next challenge starts here.
              </p>
              <ActionLink href="/about">Meet our chapter</ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
