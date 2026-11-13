"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { members } from "@/data/members";

const alphabeticalMembers = [...members].sort((a, b) =>
  a.localeCompare(b, "en", { sensitivity: "base" }),
);

export function MemberList() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = alphabeticalMembers.filter((name) =>
    name.toLocaleLowerCase().includes(normalizedQuery),
  );

  return (
    <section
      className="member-list-section"
      id="members"
      aria-labelledby="members-title"
    >
      <div className="member-list-top">
        <div>
          <h2 id="members-title">Final member list</h2>
          <p>Check the published 2026–27 roster.</p>
        </div>
        <span className="member-total">{members.length} members</span>
      </div>
      <div className="member-search">
        <Search size={20} aria-hidden="true" />
        <input
          id="member-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name"
          aria-label="Search final member list by name"
          autoComplete="off"
        />
      </div>
      <p className="member-result-count" role="status" aria-live="polite">
        {normalizedQuery
          ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}`
          : "Browse all members alphabetically"}
      </p>
      {matches.length ? (
        <ul
          className="member-name-grid"
          tabIndex={0}
          aria-label="Final members, scroll to browse"
        >
          {matches.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p className="member-empty">
          No names match “{query.trim()}”. Check the spelling or try part of a
          name.
        </p>
      )}
    </section>
  );
}
