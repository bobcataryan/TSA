"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const highlights = [
  {
    title: "Interest meeting",
    image: "/images/resource-previews/meeting-01.png",
    alt: "Pixel-art landscape announcing the TSA interest meeting",
  },
  {
    title: "Competitive events",
    image: "/images/resource-previews/meeting-02.png",
    alt: "Retro computer screen introducing TSA competitive events",
  },
  {
    title: "Final sign-ups",
    image: "/images/resource-previews/meeting-03.png",
    alt: "Browser-window artwork announcing final TSA sign-ups",
  },
] as const;

function getPosition(index: number, active: number) {
  const offset = (index - active + highlights.length) % highlights.length;
  if (offset === 0) return "active";
  if (offset === 1) return "next";
  return "back";
}

export function HeroExperience() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const select = useCallback((index: number) => {
    setActive((index + highlights.length) % highlights.length);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (hovered || focusWithin || reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % highlights.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [hovered, focusWithin, reducedMotion]);

  const followPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const element = heroRef.current;
    element?.style.setProperty("--hero-x", `${(x * 100).toFixed(2)}%`);
    element?.style.setProperty("--hero-y", `${(y * 100).toFixed(2)}%`);
    element?.style.setProperty("--hero-rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
    element?.style.setProperty("--hero-ry", `${((x - 0.5) * 7).toFixed(2)}deg`);
    element?.style.setProperty("--hero-cursor-opacity", "1");
  };

  const resetPointer = () => {
    const element = heroRef.current;
    element?.style.setProperty("--hero-x", "50%");
    element?.style.setProperty("--hero-y", "50%");
    element?.style.setProperty("--hero-rx", "0deg");
    element?.style.setProperty("--hero-ry", "0deg");
    element?.style.setProperty("--hero-cursor-opacity", "0");
  };

  return (
    <header
      ref={heroRef}
      className="hero-experience"
      data-active={active}
      onPointerMove={followPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-slide-number" aria-hidden="true">
        <span key={active}>{String(active + 1).padStart(2, "0")}</span>
        <i>/ 03</i>
      </div>
      <div className="container hero-experience-inner">
        <div className="hero-copy">
          <div className="hero-chapter-mark">
            {site.logo && (
              <Image src={site.logo} alt="" width={72} height={72} priority />
            )}
            <span>Elkins TSA</span>
          </div>
          <h1>
            <span className="hero-word-strong">Compete</span>
            <span className="hero-word-expressive">
              <em>with</em> ideas.
            </span>
          </h1>
          <div className="hero-actions">
            <Link href="/events" className="hero-action hero-action-primary">
              <span>Explore events</span>
              <b aria-hidden="true">↗</b>
            </Link>
            <a href="#members" className="hero-action hero-action-secondary">
              <span>Find your name</span>
              <b aria-hidden="true">↓</b>
            </a>
          </div>
        </div>

        <section
          className="hero-carousel"
          aria-label="Chapter highlights"
          role="region"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocusWithin(false);
            }
          }}
        >
          <div className="hero-card-stage">
            {highlights.map((highlight, index) => (
              <figure
                className="hero-card"
                data-position={getPosition(index, active)}
                data-index={index}
                aria-current={index === active ? "true" : undefined}
                aria-hidden={index === active ? undefined : "true"}
                key={highlight.title}
              >
                <Image
                  src={highlight.image}
                  alt={highlight.alt}
                  width={900}
                  height={507}
                  priority={index === 0}
                  sizes="(max-width: 700px) 88vw, 52vw"
                />
              </figure>
            ))}
          </div>
          <div className="hero-carousel-meta">
            <div className="hero-caption" aria-live="polite">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <strong>{highlights[active].title}</strong>
            </div>
            <div className="hero-carousel-controls">
              <button
                type="button"
                className="hero-arrow"
                aria-label="Previous highlight"
                onClick={() => select(active - 1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <div className="hero-dots" aria-label="Choose a highlight">
                {highlights.map((highlight, index) => (
                  <button
                    type="button"
                    aria-label={`Show ${highlight.title}`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => select(index)}
                    key={highlight.title}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="hero-arrow"
                aria-label="Next highlight"
                onClick={() => select(active + 1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
