import type { Metadata } from "next";
import { FileSignature } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/ui/section-heading";
import { ActionLink } from "@/components/ui/action-link";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import {
  ResourceList,
  MissingFiles,
} from "@/components/resources/resource-list";
import { resources, parentAgreement, meetings } from "@/data/resources";
import { links } from "@/data/links";
export const metadata: Metadata = { title: "Resources & Meeting Files" };
export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        eyebrow="The resource library"
        title="Less searching. More doing."
        description="Your chapter documents, meeting presentations, and essential membership links. All in one place."
      />
      <section className="section">
        <div className="container">
          <div id="parent-agreement" className="parent-panel">
            <FileSignature size={32} strokeWidth={1.4} />
            <div>
              <p className="eyebrow">Required for membership</p>
              <h2>Parent-Student Agreement</h2>
              <p>
                Print the parent letter, sign it with your parent or guardian,
                scan the completed form, then upload it.
              </p>
              <div className="step-links">
                {parentAgreement ? (
                  <ActionLink href={parentAgreement.href} variant="primary">
                    View Parent Letter
                  </ActionLink>
                ) : (
                  <span className="unavailable">
                    Parent letter PDF coming soon
                  </span>
                )}
                <ActionLink href={links.parentUpload}>
                  Upload Signed Form
                </ActionLink>
              </div>
              <p className="small-note">
                Google sign-in may be required to upload your signed agreement.
              </p>
              {!parentAgreement && (
                <p className="small-note">
                  The document has not been uploaded yet. Ask TSA leadership on
                  BAND if you need a copy.
                </p>
              )}
            </div>
          </div>
          <SectionHeading title="Chapter documents" eyebrow="The library" />
          {resources.length ? <ResourceExplorer /> : <MissingFiles />}
          <div className="essential-links">
            <ActionLink href={links.dues}>Pay $95 TSA Dues</ActionLink>
            <ActionLink href={links.membership}>Membership Form</ActionLink>
            <ActionLink href={links.signups}>TSA 26-27 Signups</ActionLink>
          </div>
        </div>
      </section>
      <section className="section subtle-section" id="meetings">
        <div className="container">
          <SectionHeading
            eyebrow="Catch up. Keep moving."
            title="Meeting archive"
          />
          {meetings.length ? (
            <ResourceList items={meetings} />
          ) : (
            <MissingFiles meeting />
          )}
        </div>
      </section>
    </>
  );
}
