import Link from "next/link";
import { ProjectField } from "@/components/home/project-field";

export default function Home() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="container home-hero-inner">
        <h1 className="home-title" id="home-title">
          <span>Build</span>
          <em>what matters.</em>
        </h1>
        <ProjectField />
        <div className="home-action">
          <p className="home-summary">Everything you need in one place.</p>
          <Link href="/dashboard" className="home-cta">
            <span>Open dashboard</span>
            <b aria-hidden="true">↗</b>
          </Link>
        </div>
      </div>
    </section>
  );
}
