import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
export const metadata: Metadata = {
  title: {
    default: "Elkins TSA | Chapter Dashboard",
    template: "%s | Elkins TSA",
  },
  description:
    "Elkins High School TSA: the chapter calendar, four membership steps, competitive events, and event sign-ups for 2026–2027.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
