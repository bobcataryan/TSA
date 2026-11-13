"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useMemo, useState } from "react";
import type { ResourceGroup, ResourceItem } from "@/data/resource-groups";

const accents = ["#24d8ff", "#a56cff", "#ff635e"];

function ResourceRow({ item }: { item: ResourceItem }) {
  const external = item.href?.startsWith("http");

  const moveLink = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty(
      "--link-tilt-x",
      `${(-y * 8).toFixed(2)}deg`,
    );
    event.currentTarget.style.setProperty(
      "--link-tilt-y",
      `${(x * 10).toFixed(2)}deg`,
    );
    event.currentTarget.style.setProperty(
      "--link-light-x",
      `${((x + 0.5) * 100).toFixed(1)}%`,
    );
    event.currentTarget.style.setProperty(
      "--link-light-y",
      `${((y + 0.5) * 100).toFixed(1)}%`,
    );
  };

  return (
    <li id={item.id}>
      {item.href ? (
        <a
          href={item.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          download={item.download || undefined}
          onPointerMove={moveLink}
          onPointerLeave={(event) => {
            event.currentTarget.style.removeProperty("--link-tilt-x");
            event.currentTarget.style.removeProperty("--link-tilt-y");
            event.currentTarget.style.removeProperty("--link-light-x");
            event.currentTarget.style.removeProperty("--link-light-y");
          }}
        >
          <span>{item.title}</span>
          <b aria-hidden="true">{item.download ? "↓" : "↗"}</b>
        </a>
      ) : (
        <div className="resource-pending">
          <span>{item.title}</span>
          <small>{item.note}</small>
        </div>
      )}
    </li>
  );
}

export function ResourceStage({ groups }: { groups: ResourceGroup[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredGroups = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        items: normalizedQuery
          ? group.items.filter((item) =>
              item.title.toLocaleLowerCase().includes(normalizedQuery),
            )
          : group.items,
      })),
    [groups, normalizedQuery],
  );

  const resultCount = filteredGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <section className="resources-stage" aria-label="Chapter resources">
      <div className="container resources-shell">
        <div className="resource-search-wrap">
          <label htmlFor="resource-search">Find a resource</label>
          <div className="resource-search-field">
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events, forms, files…"
              autoComplete="off"
            />
            <span aria-hidden="true">⌕</span>
          </div>
          <p aria-live="polite">
            {resultCount} {resultCount === 1 ? "resource" : "resources"}
          </p>
        </div>

        <div className="resource-columns">
          {filteredGroups.map((group, index) => (
            <article
              className="resource-column"
              key={group.title}
              style={
                {
                  "--panel-accent": accents[index % accents.length],
                } as CSSProperties
              }
            >
              <div className="resource-column-heading">
                <span>{group.number}</span>
                <h2>{group.title}</h2>
              </div>
              {group.items.length ? (
                <ul>
                  {group.items.map((item) => (
                    <ResourceRow item={item} key={item.title} />
                  ))}
                </ul>
              ) : (
                <p className="resource-column-empty">
                  No matches in this section.
                </p>
              )}
            </article>
          ))}
        </div>

        {resultCount === 0 && (
          <button
            className="resource-clear"
            type="button"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        )}
      </div>
    </section>
  );
}
