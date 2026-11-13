"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  calendarEvents,
  calendarInitialMonth,
  type CalendarEvent,
} from "@/data/calendar";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    ...options,
    timeZone: "UTC",
  });
}

function containsDate(event: CalendarEvent, date: string) {
  return event.date <= date && (event.endDate ?? event.date) >= date;
}

function eventRange(event: CalendarEvent) {
  const start = formatDate(event.date, { month: "short", day: "numeric" });
  if (!event.endDate) return start;
  const end = formatDate(event.endDate, { month: "short", day: "numeric" });
  return `${start}—${end}`;
}

export function ChapterCalendar() {
  const [month, setMonth] = useState(calendarInitialMonth);
  const [selected, setSelected] = useState("2026-11-17");
  const [year, monthNumber] = month.split("-").map(Number);
  const offset = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay();
  const totalDays = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const cellCount = Math.ceil((offset + totalDays) / 7) * 7;
  const monthStart = `${month}-01`;
  const monthEnd = `${month}-${String(totalDays).padStart(2, "0")}`;

  const monthEvents = useMemo(
    () =>
      calendarEvents.filter(
        (event) =>
          event.date <= monthEnd && (event.endDate ?? event.date) >= monthStart,
      ),
    [monthEnd, monthStart],
  );
  const selectedEvents = calendarEvents.filter((event) =>
    containsDate(event, selected),
  );

  function changeMonth(amount: number) {
    const next = new Date(Date.UTC(year, monthNumber - 1 + amount, 1));
    const nextMonth = `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
    setMonth(nextMonth);
    const firstEvent = calendarEvents.find(
      (event) =>
        event.date <= `${nextMonth}-31` &&
        (event.endDate ?? event.date) >= `${nextMonth}-01`,
    );
    setSelected(firstEvent?.date ?? `${nextMonth}-01`);
  }

  return (
    <section className="calendar-panel" aria-labelledby="calendar-title">
      <div className="calendar-toolbar">
        <div>
          <p className="interface-label">Chapter calendar</p>
          <h2 id="calendar-title" aria-live="polite">
            {formatDate(monthStart, { month: "long", year: "numeric" })}
          </h2>
        </div>
        <div className="calendar-controls">
          <button
            type="button"
            className="calendar-reset"
            onClick={() => {
              setMonth(calendarInitialMonth);
              setSelected("2026-11-17");
            }}
          >
            Season start
          </button>
          <button
            type="button"
            className="calendar-arrow"
            aria-label="Previous month"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="calendar-arrow"
            aria-label="Next month"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="calendar-scroll">
        <table
          className="calendar-table"
          aria-label={formatDate(monthStart, { month: "long", year: "numeric" })}
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
                  const events = monthEvents.filter((event) =>
                    containsDate(event, date),
                  );
                  const accessibleDate = formatDate(date, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <td key={date}>
                      <button
                        type="button"
                        className={date === selected ? "calendar-day is-selected" : "calendar-day"}
                        aria-pressed={date === selected}
                        aria-label={`${accessibleDate}${events.length ? `, ${events.map((event) => event.title).join(", ")}` : ""}`}
                        onClick={() => setSelected(date)}
                      >
                        <span className="day-number">{day}</span>
                        {events.map((event) => (
                          <span className={`calendar-event is-${event.category.toLowerCase()}`} key={event.id}>
                            {event.title}
                          </span>
                        ))}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calendar-lower">
        <div className="selected-day" aria-live="polite">
          <p className="interface-label">Selected day</p>
          <h3>
            {formatDate(selected, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {selectedEvents.length ? (
            selectedEvents.map((event) => (
              <article key={event.id}>
                <strong>{event.title}</strong>
                {event.description && <p>{event.description}</p>}
              </article>
            ))
          ) : (
            <p>No chapter item scheduled.</p>
          )}
        </div>
        <div className="month-agenda">
          <p className="interface-label">This month</p>
          {monthEvents.length ? (
            <ol>
              {monthEvents.map((event) => (
                <li key={event.id}>
                  <button type="button" onClick={() => setSelected(event.date)}>
                    <span>{eventRange(event)}</span>
                    <strong>{event.title}</strong>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p>No chapter items this month.</p>
          )}
        </div>
      </div>
    </section>
  );
}
