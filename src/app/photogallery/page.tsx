import type { Metadata } from "next";

export const metadata: Metadata = { title: "Photo Gallery" };

export default function PhotoGalleryPage() {
  return (
    <header className="page-intro">
      <div className="container page-intro-inner">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> Elkins TSA / Photo Gallery
          </p>
          <h1>
            Photo Gallery<span className="accent-period">.</span>
          </h1>
        </div>
        <span className="page-number" aria-hidden="true">
          04
        </span>
      </div>
    </header>
  );
}
