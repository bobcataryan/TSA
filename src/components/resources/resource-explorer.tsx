"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { resources } from "@/data/resources";
import { ResourceList } from "./resource-list";
export function ResourceExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All files");
  const categories = [
    "All files",
    ...new Set(resources.map((item) => item.category)),
  ];
  const filtered = resources.filter(
    (item) =>
      (category === "All files" || category === item.category) &&
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div>
      <label className="filter-search">
        <Search size={19} />
        <input
          aria-label="Search resources"
          placeholder="Find a document…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="category-filters">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            className={category === item ? "selected" : ""}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {filtered.length} files
      </p>
      {filtered.length ? (
        <ResourceList items={filtered} />
      ) : (
        <div className="empty-state">
          <h3>No matching files.</h3>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("All files");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
