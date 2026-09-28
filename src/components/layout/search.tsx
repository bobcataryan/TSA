"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { links, navigation } from "@/data/links";
import { resources } from "@/data/resources";
import { events } from "@/data/events";
import { announcements } from "@/data/announcements";
const entries = [
  ...navigation.map((item) => ({
    title: item.label,
    href: item.href,
    group: "Pages",
    keywords: "",
  })),
  {
    title: "Pay $95 TSA dues",
    href: links.dues,
    group: "Membership",
    keywords: "revtrak payment",
  },
  {
    title: "2026–27 membership form",
    href: links.membership,
    group: "Membership",
    keywords: "join application",
  },
  {
    title: "Parent-Student Agreement",
    href: "/resources#parent-agreement",
    group: "Membership",
    keywords: "parent letter print sign pdf",
  },
  {
    title: "Upload signed agreement",
    href: links.parentUpload,
    group: "Membership",
    keywords: "parent letter submission",
  },
  {
    title: "Member checklist",
    href: "/#checklist",
    group: "Membership",
    keywords: "requirements deadline join",
  },
  {
    title: "Officer applications",
    href: "/about#leadership",
    group: "Leadership",
    keywords: "officers application tenth eleventh",
  },
  {
    title: "Meeting archive",
    href: "/resources#meetings",
    group: "Resources",
    keywords: "meeting slides presentations PDFs",
  },
  ...resources.map((item) => ({
    title: item.title,
    href: item.href,
    group: "Files",
    keywords: item.description,
  })),
  ...events.map((item) => ({
    title: item.name,
    href: `/events#${item.id}`,
    group: item.status === "Example" ? "Event examples" : "Events",
    keywords: item.category + " " + item.description,
  })),
  ...announcements.map((item) => ({
    title: item.title,
    href: `/announcements#${item.id}`,
    group: "Announcements",
    keywords: item.summary,
  })),
];
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(
    () =>
      entries
        .filter((item) =>
          `${item.title} ${item.group} ${item.keywords}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 12),
    [query],
  );
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  function choose(href: string) {
    setOpen(false);
    if (/^https?:/.test(href))
      window.open(href, "_blank", "noopener,noreferrer");
    else if (/\.(pdf|pptx?|docx?)(?:$|\?)/i.test(href))
      window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setQuery("");
          setActive(0);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="search-trigger" aria-label="Search the website">
          <Search size={18} />
          <span>Search</span>
          <kbd>⌘ K</kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="search-dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            input.current?.focus();
          }}
        >
          <Dialog.Title className="sr-only">Search Elkins TSA</Dialog.Title>
          <Dialog.Description className="sr-only">
            Find pages, forms, event information, and files. Use the arrow keys
            and Enter to select a result.
          </Dialog.Description>
          <div className="search-input-row">
            <Search size={20} />
            <input
              ref={input}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              placeholder="What are you looking for?"
              aria-label="Search pages and resources"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls="search-results"
              aria-activedescendant={
                results[active] ? `search-result-${active}` : undefined
              }
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next =
                    (active +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      results.length) %
                    Math.max(results.length, 1);
                  setActive(next);
                  document
                    .getElementById(`search-result-${next}`)
                    ?.scrollIntoView({ block: "nearest" });
                }
                if (event.key === "Enter" && results[active]) {
                  event.preventDefault();
                  choose(results[active].href);
                }
              }}
            />
            <Dialog.Close className="icon-button" aria-label="Close search">
              <X size={20} />
            </Dialog.Close>
          </div>
          <div
            className="search-results"
            id="search-results"
            role="listbox"
            aria-label="Search results"
          >
            {results.length ? (
              results.map((item, index) => (
                <div
                  role="option"
                  aria-selected={active === index}
                  id={`search-result-${index}`}
                  key={item.group + item.title}
                  className={
                    active === index ? "search-result active" : "search-result"
                  }
                  onMouseMove={() => setActive(index)}
                  onClick={() => choose(item.href)}
                >
                  <div>
                    <span>{item.group}</span>
                    <strong>{item.title}</strong>
                  </div>
                  {/^https?:/.test(item.href) ? (
                    <ArrowUpRight size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <Search size={28} />
                <h3>No results for “{query}”</h3>
                <p>Try dues, parent letter, coding, or meeting slides.</p>
              </div>
            )}
          </div>
          <div className="search-footer">
            <span>↑ ↓ Navigate &nbsp; ↵ Open</span>
            <span>Esc to close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
