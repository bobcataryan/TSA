"use client";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import {
  events,
  fitsTeamSize,
  teamSizeLabel,
  type TSAEvent,
} from "@/data/events";
export function EventCard({ event }: { event: TSAEvent }) {
  return (
    <article className="event-card" id={event.id}>
      <div className="event-card-top">
        <span className="eyebrow">{event.category}</span>
        <ArrowUpRight size={24} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <h3>{event.name}</h3>
      <div className="event-card-meta">
        <span>
          {event.maxTeamSize === 1 ? (
            <UserRound size={14} />
          ) : (
            <Users size={14} />
          )}
          {teamSizeLabel(event)}
        </span>
      </div>
    </article>
  );
}
export function EventExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All events");
  const [team, setTeam] = useState("");
  const categories = [
    "All events",
    ...new Set(events.map((event) => event.category)),
  ];
  const filtered = events.filter(
    (event) =>
      (category === "All events" || category === event.category) &&
      (team === "" || fitsTeamSize(event, Number(team))) &&
      `${event.name} ${event.category}`
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
          <span className="sr-only">People per team</span>
          <select
            value={team}
            onChange={(event) => setTeam(event.target.value)}
          >
            <option value="">Any team size</option>
            {[1, 2, 3, 4, 5, 6].map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? "person" : "people"}
              </option>
            ))}
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
              setTeam("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
