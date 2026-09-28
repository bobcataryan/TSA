import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionLink } from "@/components/ui/action-link";
import { calendarEvents } from "@/data/calendar";
import { deadlineDetails } from "@/data/deadlines";

const deadlines = calendarEvents.filter(
  (event) => event.category === "Deadline",
);
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return deadlines.map((event) => ({ slug: event.id }));
}

function getDeadline(slug: string) {
  const event = deadlines.find((event) => event.id === slug);
  const details = deadlineDetails[slug];
  if (!event || !details) notFound();
  return { event, details };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event, details } = getDeadline((await params).slug);
  return { title: event.title, description: details.introduction };
}

export default async function DeadlinePage({ params }: Props) {
  const { event, details } = getDeadline((await params).slug);
  const dateLabel = new Date(`${event.date}T12:00:00Z`).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  );

  return (
    <div className="container deadline-page">
      <ActionLink href="/">Back to chapter calendar</ActionLink>
      <article className="deadline-card">
        <header className="deadline-heading">
          <p className="eyebrow">Elkins TSA / 2026–2027</p>
          <h1>{event.title}</h1>
          <div className="deadline-date">
            <span>Due</span>
            <time dateTime={event.date}>{dateLabel}</time>
            {event.time && <span>{event.time}</span>}
          </div>
          <p>{details.introduction}</p>
        </header>
        <section
          className="deadline-instructions"
          aria-labelledby="steps-title"
        >
          <h2 id="steps-title">What to do</h2>
          <ol className="member-steps">
            {details.steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.links.length > 0 && (
                    <div className="step-links">
                      {step.links.map((link) => (
                        <ActionLink key={link.href} href={link.href}>
                          {link.label}
                        </ActionLink>
                      ))}
                    </div>
                  )}
                  {step.note && <p className="missing-note">{step.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <p className="deadline-note">{details.note}</p>
        </section>
      </article>
    </div>
  );
}
