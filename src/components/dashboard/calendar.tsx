"use client";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { calendarEvents, calendarInitialMonth } from "@/data/calendar";
import { chapterDate, useClock } from "@/lib/use-clock";
import { ActionLink } from "@/components/ui/action-link";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const label = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    ...options,
    timeZone: "UTC",
  });
export function ChapterCalendar() {
  const now = useClock();
  const today = now === null ? null : chapterDate(now);
  const [viewedMonth, setViewedMonth] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const month = viewedMonth ?? today?.slice(0, 7) ?? calendarInitialMonth;
  const [year, monthNumber] = month.split("-").map(Number);
  const offset = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay();
  const totalDays = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const cellCount = Math.ceil((offset + totalDays) / 7) * 7;
  const monthEvents = calendarEvents
    .filter((event) => event.date.startsWith(month))
    .sort((a, b) => a.date.localeCompare(b.date));
  const selectedDate = selected?.startsWith(month)
    ? selected
    : today?.startsWith(month)
      ? today
      : `${month}-01`;
  const selectedEvents = monthEvents.filter(
    (event) => event.date === selectedDate,
  );
  function changeMonth(amount: number) {
    const next = new Date(Date.UTC(year, monthNumber - 1 + amount, 1));
    setViewedMonth(
      `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`,
    );
    setSelected(null);
  }
  return (
    <section className="calendar-panel" aria-labelledby="calendar-title">
      <div className="calendar-toolbar">
        <div>
          <div className="panel-eyebrow">
            <CalendarDays size={15} /> Chapter calendar
          </div>
          <h2 id="calendar-title" aria-live="polite">
            {label(`${month}-01`, { month: "long", year: "numeric" })}
          </h2>
        </div>
        <div className="calendar-controls">
          <button
            className="today-button"
            onClick={() => {
              setViewedMonth(null);
              setSelected(null);
            }}
          >
            Today
          </button>
          <button
            className="icon-button"
            aria-label="Previous month"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="icon-button"
            aria-label="Next month"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
      <table
        className="calendar-table"
        aria-label={label(`${month}-01`, { month: "long", year: "numeric" })}
      >
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th key={day} scope="col">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: cellCount / 7 }, (_, week) => (
            <tr key={week}>
              {Array.from({ length: 7 }, (_, weekday) => {
                const day = week * 7 + weekday - offset + 1;
                if (day < 1 || day > totalDays)
                  return <td className="outside-month" key={weekday} />;
                const date = `${month}-${String(day).padStart(2, "0")}`;
                const dayEvents = monthEvents.filter(
                  (event) => event.date === date,
                );
                return (
                  <td key={weekday}>
                    <button
                      className={`calendar-day ${date === today ? "is-today" : ""} ${date === selectedDate ? "is-selected" : ""}`}
                      onClick={() => setSelected(date)}
                      aria-pressed={date === selectedDate}
                      aria-label={`${label(date, { month: "long", day: "numeric", year: "numeric" })}${date === today ? ", today" : ""}${dayEvents.length ? ", " + dayEvents.map((event) => event.title).join(", ") : ""}`}
                    >
                      <span className="day-number">{day}</span>
                      <span className="cell-events">
                        {dayEvents.map((event) => (
                          <span
                            key={event.id}
                            className={`calendar-event ${event.category === "Deadline" ? "deadline-event" : ""}`}
                          >
                            <span className="event-dot" />
                            <span className="calendar-event-label">
                              {event.title}
                            </span>
                          </span>
                        ))}
                      </span>
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="calendar-legend">
        <span>
          <span className="event-dot" /> Chapter dates
        </span>
        <span>All times Central</span>
      </div>
      <div className="selected-day" aria-live="polite">
        <h3>
          {label(selectedDate, {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </h3>
        {selectedEvents.length ? (
          selectedEvents.map((event) => (
            <article key={event.id}>
              <div>
                <strong>{event.title}</strong>
                {event.time && <span className="event-time">{event.time}</span>}
                {event.description && <p>{event.description}</p>}
              </div>
              {event.href && (
                <ActionLink href={event.href}>View details</ActionLink>
              )}
            </article>
          ))
        ) : (
          <p>No events scheduled for this day.</p>
        )}
      </div>
    </section>
  );
}
