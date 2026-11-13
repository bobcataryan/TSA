import type { Metadata } from "next";
import { ChapterCalendar } from "@/components/dashboard/calendar";
import { TodoList } from "@/components/dashboard/todo-list";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Elkins TSA chapter calendar, deadlines, and member actions.",
};

export default function DashboardPage() {
  return (
    <div className="dashboard-stage" data-background="horizon">
      <h1 className="sr-only">Dashboard</h1>
      <div className="container dashboard-layout">
        <ChapterCalendar />
        <TodoList />
      </div>
    </div>
  );
}
