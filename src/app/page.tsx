import { ChapterCalendar } from "@/components/dashboard/calendar";
import { MemberChecklist } from "@/components/dashboard/member-checklist";
export default function Home() {
  return (
    <div className="container dashboard">
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">Elkins TSA / 2026–2027</p>
          <h1>Chapter dashboard</h1>
        </div>
        <p>Your dates and membership essentials.</p>
      </header>
      <div className="dashboard-grid">
        <ChapterCalendar />
        <MemberChecklist />
      </div>
    </div>
  );
}
