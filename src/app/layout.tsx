import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
export const metadata: Metadata = {
  title: {
    default: "Elkins TSA | Members",
    template: "%s | Elkins TSA",
  },
  description:
    "Elkins High School TSA: search the final 2026–27 member list, access dues and the parent-student agreement, and explore chapter events.",
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
