import Link from "next/link";
import { links } from "@/data/links";

const tasks = [
  {
    title: "Ideation workshop",
    detail: "Use the workshop materials to shape and pressure-test the idea.",
    href: "/resources#ideation-worksheets",
  },
  {
    title: "Check membership",
    detail: "Confirm that your name appears on the current chapter roster.",
    href: "/resources#membership-spreadsheet",
  },
  {
    title: "Pay dues",
    detail: "Complete the Elkins TSA dues payment through RevTrak.",
    href: links.dues,
  },
  {
    title: "Upload CTSO agreement",
    detail: "Submit the signed parent-student agreement.",
    href: links.parentUpload,
  },
] as const;

export function TodoList() {
  return (
    <aside className="todo-panel" aria-labelledby="todo-title">
      <div className="todo-heading">
        <p className="interface-label">To-do</p>
        <h2 id="todo-title">Four actions.</h2>
        <p>Start here, then return to the calendar for deadlines.</p>
      </div>
      <ol className="todo-list">
        {tasks.map((task, index) => {
          const external = task.href.startsWith("http");
          return (
            <li key={task.title}>
              <span className="todo-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{task.title}</h3>
                <p>{task.detail}</p>
              </div>
              <Link
                href={task.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={task.title}
              >
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
