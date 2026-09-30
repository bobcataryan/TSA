"use client";
import { useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  UserRound,
  Code2,
  FlaskConical,
  Cog,
  Palette,
  Mic2,
  Clapperboard,
  Flag,
  ChevronDown,
} from "lucide-react";
import {
  events,
  fitsTeamSize,
  teamSizeLabel,
  type TSAEvent,
} from "@/data/events";
const categoryIcons = {
  Engineering: Cog,
  Design: Palette,
  Coding: Code2,
  Media: Clapperboard,
  Science: FlaskConical,
  Presentation: Mic2,
  Leadership: Flag,
};
export function EventCard({ event }: { event: TSAEvent }) {
  const Icon =
    categoryIcons[event.category as keyof typeof categoryIcons] ?? Cog;
  return (
    <article
      className="event-card"
      id={event.id}
      data-category={event.category}
    >
      <div className="event-card-top">
        <span className="eyebrow">{event.category}</span>
        <span className="event-icon">
          <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
        </span>
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
        <span className="team-capacity" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className={
                i < event.minTeamSize
                  ? "required"
                  : i < event.maxTeamSize
                    ? "available"
                    : ""
              }
            />
          ))}
        </span>
      </div>
    </article>
  );
}
export function EventExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All events");
  const [team, setTeam] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  function resetFilters() {
    setQuery("");
    setCategory("All events");
    setTeam("");
    searchInput.current?.focus();
  }
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
  const grouped = categories
    .slice(1)
    .map((item) => ({
      category: item,
      events: filtered.filter((event) => event.category === item),
    }))
    .filter((group) => group.events.length > 0);
  const hasActiveFilters = Boolean(
    query.trim() || category !== "All events" || team,
  );
  return (
    <div className="event-explorer">
      <div className="filter-toolbar">
        <label className="filter-search">
          <Search size={19} />
          <input
            ref={searchInput}
            type="search"
            placeholder="Search events or categories…"
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
        <span>
          <strong>{String(filtered.length).padStart(2, "0")}</strong>{" "}
          {filtered.length === 1 ? "event" : "events"} to explore
        </span>
        {(query || category !== "All events" || team) && (
          <button className="clear-filters" onClick={resetFilters}>
            Clear filters <span aria-hidden="true">×</span>
          </button>
        )}
      </p>
      {filtered.length ? (
        <div className="event-groups">
          {grouped.map((group, index) => {
            const Icon =
              categoryIcons[group.category as keyof typeof categoryIcons] ??
              Cog;
            return (
              <details
                className="event-category"
                data-category={group.category}
                key={`${group.category}-${query}-${category}-${team}`}
                open={hasActiveFilters || index === 0}
              >
                <summary>
                  <span className="event-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <span className="event-category-name">{group.category}</span>
                  <span className="event-category-count">
                    {group.events.length}{" "}
                    {group.events.length === 1 ? "event" : "events"}
                  </span>
                  <ChevronDown
                    className="event-category-chevron"
                    size={20}
                    aria-hidden="true"
                  />
                </summary>
                <div className="event-grid">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={30} />
          <h3>No events found.</h3>
          <p>Try another search or reset the filters.</p>
          <button className="button button-outline" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
