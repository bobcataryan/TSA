import { ChapterCalendar } from "@/components/dashboard/calendar";
import { MemberChecklist } from "@/components/dashboard/member-checklist";
import { ActionLink } from "@/components/ui/action-link";
import { events } from "@/data/events";
import { resources } from "@/data/resources";
export default function Home() {
  return (
    <div className="container dashboard">
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> Elkins High School / TSA
          </p>
          <h1 aria-label="Chapter dashboard">
            Chapter <span>dashboard.</span>
          </h1>
          <p className="heading-description">
            Your next deadline. Your next idea. Your next step.
          </p>
        </div>
        <div className="season-mark" aria-label="2026–2027 season">
          <span>THE NEXT CHAPTER</span>
          <strong>
            26<span>/</span>27
          </strong>
          <span>TECHNOLOGY STUDENT ASSOCIATION</span>
        </div>
      </header>
      <div className="chapter-strip">
        <span>
          <span className="status-dot" /> 2026–2027 season
        </span>
        <ActionLink href="/events">
          {events.length} competitive events
        </ActionLink>
        <ActionLink href="/resources">
          {resources.length} chapter documents
        </ActionLink>
      </div>
      <div className="dashboard-grid">
        <ChapterCalendar />
        <MemberChecklist />
      </div>
    </div>
  );
}
