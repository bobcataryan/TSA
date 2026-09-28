import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/section-heading";
import { links } from "@/data/links";
import { meetings, resources, type Resource } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Past meeting presentations, chapter files, and useful Elkins TSA links.",
};

const usefulLinks = [
  { title: "Event sign-up spreadsheet", href: links.signups },
  { title: "Membership form", href: links.membership },
  { title: "Pay TSA dues", href: links.dues },
  { title: "Parent-Student Agreement upload", href: links.parentUpload },
  { title: "National TSA event information", href: links.nationalEvents },
];

function ResourceList({ items }: { items: Resource[] }) {
  return (
    <ul className="resource-list">
      {items.map((resource) => (
        <li key={resource.id}>
          <div>
            <ActionLink href={resource.href}>{resource.title}</ActionLink>
            {resource.description && <p>{resource.description}</p>}
          </div>
          <span className="resource-type">{resource.type}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  const files = resources.filter(
    (resource) => resource.category !== "Meetings",
  );
  return (
    <>
      <PageIntro
        eyebrow="Resources"
        title="Resources"
        description="Past meeting PowerPoints, chapter files, and useful links."
      />
      <div className="container resource-sections">
        <section className="resource-section" aria-labelledby="meetings-title">
          <h2 id="meetings-title">Past meeting presentations</h2>
          {meetings.length ? (
            <ResourceList items={meetings} />
          ) : (
            <p>No meeting presentations have been posted yet.</p>
          )}
        </section>
        <section className="resource-section" aria-labelledby="files-title">
          <h2 id="files-title">Files</h2>
          {files.length ? (
            <ResourceList items={files} />
          ) : (
            <p>No files have been posted yet.</p>
          )}
        </section>
        <section className="resource-section" aria-labelledby="links-title">
          <h2 id="links-title">Useful links</h2>
          <ul className="resource-list">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <ActionLink href={link.href}>{link.title}</ActionLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
