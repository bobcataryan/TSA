import { FileText, Download, ArrowUpRight, FolderOpen } from "lucide-react";
import { type Resource } from "@/data/resources";
export function ResourceList({ items }: { items: Resource[] }) {
  return (
    <div className="resource-list">
      {items.map((item) => (
        <article className="resource-row" key={item.id} id={item.id}>
          <div className="file-icon">
            <FileText size={22} strokeWidth={1.4} />
            <span>{item.type}</span>
          </div>
          <div className="resource-description">
            <div className="resource-meta">
              <span>{item.category}</span>
              {item.latest && <span className="tag">Latest</span>}
              {item.date && (
                <time dateTime={item.date}>
                  {new Date(item.date + "T12:00:00").toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </time>
              )}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <div className="resource-actions">
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              View
              <ArrowUpRight size={15} aria-label="opens in a new tab" />
            </a>
            <a href={item.href} download aria-label={`Download ${item.title}`}>
              <Download size={17} />
              <span>Download</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
export function MissingFiles({ meeting = false }: { meeting?: boolean }) {
  return (
    <div className="file-empty">
      <FolderOpen size={28} strokeWidth={1.3} />
      <div>
        <h3>
          {meeting
            ? "Meeting files are on their way."
            : "Chapter documents will appear here."}
        </h3>
        <p>
          {meeting
            ? "Missed a meeting? Check back for presentations and PDFs, or message an officer on BAND."
            : "The parent letter and additional resources will be added here when available. For now, use the membership forms and links below."}
        </p>
      </div>
      <span className="status-label">Awaiting files</span>
    </div>
  );
}
