import type { Metadata } from "next";
import { Pin } from "lucide-react";
import { PageIntro } from "@/components/ui/section-heading";
import { ActionLink } from "@/components/ui/action-link";
import { ResourceList } from "@/components/resources/resource-list";
import { sortedAnnouncements } from "@/data/announcements";
import { resources } from "@/data/resources";
export const metadata: Metadata = { title: "Announcements" };
export default function AnnouncementsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chapter updates"
        title="Stay a step ahead."
        description="The latest membership updates, meeting notes, and competition announcements."
      />
      <section className="section">
        <div className="container announcement-layout">
          <aside className="announcement-sidebar">
            <span className="eyebrow">2026–2027</span>
            <h2>Chapter bulletin</h2>
            <p>Important updates from Elkins TSA leadership.</p>
            <ActionLink href="/#checklist">Member checklist</ActionLink>
          </aside>
          <div className="announcement-feed">
            {sortedAnnouncements.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className={`announcement-full ${item.pinned ? "pinned" : ""}`}
              >
                <div className="announcement-meta">
                  {item.pinned && (
                    <span className="tag tag-red">
                      <Pin size={12} />
                      Pinned announcement
                    </span>
                  )}
                  <span>{item.category}</span>
                  {item.date && (
                    <time dateTime={item.date}>
                      {new Date(item.date + "T12:00:00").toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" },
                      )}
                    </time>
                  )}
                </div>
                <h2>{item.title}</h2>
                <p className="announcement-summary">{item.summary}</p>
                {item.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="announcement-links">
                  {item.links.map((link) => (
                    <ActionLink href={link.href} key={link.href}>
                      {link.label}
                    </ActionLink>
                  ))}
                </div>
                {item.resourceIds.length > 0 && (
                  <ResourceList
                    items={resources.filter((resource) =>
                      item.resourceIds.includes(resource.id),
                    )}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
