import type { Metadata } from "next";
import Image from "next/image";
import { Trophy, Compass, Ruler, Users } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/ui/section-heading";
import { Leadership } from "@/components/home/leadership";
import { ActionLink } from "@/components/ui/action-link";
import { Brand } from "@/components/ui/brand";
import { officers, chapterStats, openPositions } from "@/data/officers";
export const metadata: Metadata = { title: "About Our Chapter" };
const pillars = [
  {
    title: "Competition",
    icon: Trophy,
    text: "Put your skills to the test through challenges in technology, design, and communication.",
  },
  {
    title: "Leadership",
    icon: Compass,
    text: "Take initiative, support your team, and learn to lead with purpose.",
  },
  {
    title: "Engineering",
    icon: Ruler,
    text: "Ask better questions. Explore ideas. Develop solutions through hands-on problem solving.",
  },
  {
    title: "Community",
    icon: Users,
    text: "Work alongside students who share your curiosity and ambition.",
  },
];
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our chapter"
        title="Ideas are just the beginning."
        description="We’re Elkins High School’s Technology Student Association. A place to explore, collaborate, compete, and grow."
      />
      <section className="section">
        <div className="container">
          <div className="chapter-intro">
            <div className="chapter-mark">
              <Brand large />
              <span>ELKINS HIGH SCHOOL / 2026–2027</span>
            </div>
            <div>
              <p className="eyebrow">Built on curiosity</p>
              <h2>
                Technology.
                <br />
                With a human side.
              </h2>
              <p>
                Technology Student Association gives students opportunities to
                compete in STEM, engineering, technology, design, presentation,
                and leadership events.
              </p>
              <p>
                Our chapter is where those opportunities become your next
                project, your next team, and your next step forward.
              </p>
              <ActionLink href="/#checklist">Join Elkins TSA</ActionLink>
            </div>
          </div>
          {chapterStats.length > 0 && (
            <div className="chapter-stats">
              {chapterStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title}>
                <pillar.icon size={27} strokeWidth={1.4} />
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <Leadership />
      </div>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="The people behind the chapter"
            title="Student-led. Forward-looking."
          />
          {officers.length ? (
            <div className="officer-grid">
              {officers.map((officer) => (
                <article key={officer.name}>
                  {officer.image && (
                    <Image
                      src={officer.image}
                      alt={officer.name}
                      width={400}
                      height={480}
                    />
                  )}
                  <span className="eyebrow">{officer.role}</span>
                  <h3>{officer.name}</h3>
                  {officer.grade && <span>Grade {officer.grade}</span>}
                  <p>{officer.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="officer-empty">
              <p>
                The 2026–2027 officer roster will be shared here when available.
              </p>
              <p>
                Questions in the meantime? Contact TSA leadership through BAND.
              </p>
              {openPositions.length > 0 && (
                <div className="category-filters">
                  {openPositions.map((role) => (
                    <span className="tag" key={role}>
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
