"use client";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import { events, type TSAEvent } from "@/data/events";
import { ActionLink } from "@/components/ui/action-link";
export function EventCard({ event }: { event: TSAEvent }) {
  return (
    <article className="event-card" id={event.id}>
      <div className="event-card-top">
        <span className="eyebrow">{event.category}</span>
        <ArrowUpRight size={24} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <div className="event-card-meta">
        <span>
          {event.teamType === "Individual" ? (
            <UserRound size={14} />
          ) : (
            <Users size={14} />
          )}
          {event.teamType}
          {event.maxTeamSize ? ` · up to ${event.maxTeamSize}` : ""}
        </span>
        <span className="tag">
          {event.status === "Example" ? "Example · unconfirmed" : event.status}
        </span>
      </div>
      {(event.requirements.length > 0 ||
        event.importantDates.length > 0 ||
        event.resources.length > 0) && (
        <details>
          <summary>Requirements & resources</summary>
          {event.requirements.length > 0 && (
            <ul>
              {event.requirements.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          )}
          {event.importantDates.map((date) => (
            <p key={date.label}>
              {date.label}: {date.date}
            </p>
          ))}
          {event.resources.map((resource) => (
            <ActionLink key={resource.href} href={resource.href}>
              {resource.label}
            </ActionLink>
          ))}
        </details>
      )}
    </article>
  );
}
export function EventExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All events");
  const [team, setTeam] = useState("All formats");
  const categories = [
    "All events",
    ...new Set(events.map((event) => event.category)),
  ];
  const filtered = events.filter(
    (event) =>
      (category === "All events" || category === event.category) &&
      (team === "All formats" || team === event.teamType) &&
      `${event.name} ${event.description} ${event.category}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div>
      <div className="filter-toolbar">
        <label className="filter-search">
          <Search size={19} />
          <input
            placeholder="Search events, skills, or interests…"
            aria-label="Search events"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="format-filter">
          <SlidersHorizontal size={16} />
          <span className="sr-only">Event format</span>
          <select
            value={team}
            onChange={(event) => setTeam(event.target.value)}
          >
            <option>All formats</option>
            {[...new Set(events.map((event) => event.teamType))].map(
              (format) => (
                <option key={format}>{format}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <div className="category-filters" aria-label="Event categories">
        {categories.map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {filtered.length} {filtered.length === 1 ? "event" : "events"}
        {events.some((event) => event.status === "Example")
          ? " · Examples are not confirmed chapter offerings"
          : ""}
      </p>
      {filtered.length ? (
        <div className="event-grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={30} />
          <h3>No events found.</h3>
          <p>Try another search or reset the filters.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("All events");
              setTeam("All formats");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
