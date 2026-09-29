import type { Metadata } from "next";
import Image from "next/image";
import { FileText, Download, ArrowUpRight } from "lucide-react";
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
  { title: "Membership progress sheet", href: links.membershipSheet },
  { title: "Event sign-up spreadsheet", href: links.signups },
  { title: "Membership form", href: links.membership },
  { title: "Event sign-up form", href: links.eventSignupForm },
  { title: "Officer applications", href: links.officerApplications },
  { title: "Parent-Student Agreement file", href: links.parentAgreement },
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
          <div className="resource-actions">
            <span className="resource-type">{resource.type}</span>
            {resource.href.startsWith("/") &&
              !resource.href.startsWith("//") && (
                <a
                  className="action-link"
                  href={resource.href}
                  download
                  aria-label={`Download ${resource.title}`}
                >
                  Download
                </a>
              )}
          </div>
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
        title="The chapter library."
        description="Catch up on a meeting. Find the right form. Pick up where you left off."
        number="03"
      />
      <div className="container resource-sections">
        <section className="resource-section" aria-labelledby="meetings-title">
          <div className="resource-section-heading">
            <div>
              <p className="eyebrow">01 / The archive</p>
              <h2 id="meetings-title">Meeting presentations</h2>
            </div>
            <span className="count-badge">
              {String(meetings.length).padStart(2, "0")} documents
            </span>
          </div>
          {meetings.length ? (
            <div className="presentation-grid">
              {meetings.map((meeting, index) => (
                <article className="presentation-card" key={meeting.id}>
                  <a
                    className="presentation-preview"
                    href={meeting.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${meeting.title} (new tab)`}
                  >
                    {meeting.preview ? (
                      <Image
                        src={meeting.preview}
                        width={900}
                        height={506}
                        alt=""
                      />
                    ) : (
                      <FileText size={52} aria-hidden="true" />
                    )}
                    <span className="preview-open">
                      <ArrowUpRight size={22} />
                    </span>
                  </a>
                  <div className="presentation-info">
                    <div className="presentation-meta">
                      <span>DOCUMENT {String(index + 1).padStart(2, "0")}</span>
                      <span>{meeting.type}</span>
                    </div>
                    <h3>
                      <ActionLink href={meeting.href}>
                        {meeting.title}
                      </ActionLink>
                    </h3>
                    <a
                      className="download-link"
                      href={meeting.href}
                      download
                      aria-label={`Download ${meeting.title}`}
                    >
                      <Download size={16} /> Download presentation
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No meeting presentations have been posted yet.</p>
          )}
        </section>
        <section className="resource-section" aria-labelledby="files-title">
          <div className="resource-section-heading">
            <div>
              <p className="eyebrow">02 / Chapter documents</p>
              <h2 id="files-title">Files</h2>
            </div>
            <FileText size={24} aria-hidden="true" />
          </div>
          {files.length ? (
            <ResourceList items={files} />
          ) : (
            <p>No files have been posted yet.</p>
          )}
        </section>
        <section className="resource-section" aria-labelledby="links-title">
          <div className="resource-section-heading">
            <div>
              <p className="eyebrow">03 / Quick access</p>
              <h2 id="links-title">The links you need.</h2>
            </div>
            <span className="count-badge">{usefulLinks.length} links</span>
          </div>
          <ul className="resource-list useful-links">
            {usefulLinks.map((link, index) => (
              <li key={link.href}>
                <span className="link-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ActionLink href={link.href}>{link.title}</ActionLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
