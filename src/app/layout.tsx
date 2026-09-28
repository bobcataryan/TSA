import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DeadlineStrip } from "@/components/ui/deadline";
export const metadata: Metadata = {
  title: {
    default: "Elkins High School TSA | 2026–2027",
    template: "%s | Elkins TSA",
  },
  description:
    "The 2026–2027 Elkins High School Technology Student Association hub. Membership steps, deadlines, announcements, competitive events, and meeting resources.",
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
        <DeadlineStrip />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
