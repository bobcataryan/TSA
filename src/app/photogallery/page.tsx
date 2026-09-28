import type { Metadata } from "next";

export const metadata: Metadata = { title: "Photo Gallery" };

export default function PhotoGalleryPage() {
  return (
    <header className="page-intro">
      <div className="container">
        <p className="eyebrow">EHS TSA / Photo Gallery</p>
        <h1>Photo Gallery</h1>
      </div>
    </header>
  );
}
