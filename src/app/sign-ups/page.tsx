import type { Metadata } from "next";
import {
  ArrowUpRight,
  Table2,
  Check,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { PageIntro } from "@/components/ui/section-heading";
import { ActionLink } from "@/components/ui/action-link";
import { links, signupsConfig } from "@/data/links";
export const metadata: Metadata = { title: "2026–27 Event Sign-Ups" };
export default function SignUpsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Make your selection"
        title="2026–27 Event Sign-Ups"
        description="Check your event selections and make sure you are registered for at least one event."
      />
      <section className="section">
        <div className="container">
          <div className="signups-toolbar">
            <div>
              <span className="eyebrow">Official chapter spreadsheet</span>
              <h2>TSA 26-27 Signups</h2>
            </div>
            <ActionLink href={links.signups} variant="primary">
              Open Full Spreadsheet
            </ActionLink>
          </div>
          {signupsConfig.embedUrl ? (
            <div className="sheet-embed">
              <iframe
                title="TSA 26-27 event sign-ups spreadsheet"
                src={signupsConfig.embedUrl}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <p>
                If the sheet does not appear,{" "}
                <a
                  href={links.signups}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open it in Google Sheets <ArrowUpRight size={14} />
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="sheet-preview">
              <div className="sheet-preview-top">
                <span className="sheet-document-icon">
                  <Table2 size={19} />
                </span>
                <span>TSA 26-27 Signups</span>
                <span className="tag">Google Sheets</span>
              </div>
              <div className="sheet-preview-body">
                <div className="sheet-grid-decoration" aria-hidden="true" />
                <div className="sheet-message">
                  <span className="large-icon">
                    <Table2 size={32} strokeWidth={1.4} />
                  </span>
                  <h3>
                    Your next challenge
                    <br />
                    starts with a sign-up.
                  </h3>
                  <p>
                    View and update your selections in the chapter’s shared
                    spreadsheet. It opens directly in Google Sheets with its
                    existing access permissions.
                  </p>
                  <ActionLink href={links.signups} variant="primary">
                    Open Full Spreadsheet
                  </ActionLink>
                  <span className="sheet-access-note">
                    <ExternalLink size={13} />
                    Google may ask you to sign in.
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="signup-instructions">
            {[
              {
                n: "01",
                title: "Find your event",
                text: "Explore the chapter’s available event options in the spreadsheet.",
              },
              {
                n: "02",
                title: "Check your selection",
                text: "Make sure your name is listed for at least one competitive event.",
              },
              {
                n: "03",
                title: "Finish your membership",
                text: "An event sign-up is one of four required membership steps.",
              },
            ].map((item) => (
              <div key={item.n}>
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="notice">
            <MessageCircle size={20} />
            <p>
              <strong>Notice something incorrect?</strong> Message a TSA officer
              as soon as possible.
            </p>
          </div>
          <div className="inline-callout">
            <Check size={18} />
            <p>Signed up? Keep going with the other membership requirements.</p>
            <ActionLink href="/#checklist">Member checklist</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
