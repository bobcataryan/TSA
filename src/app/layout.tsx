import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/geist";
import "./site.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
export const metadata: Metadata = {
  title: {
    default: "Elkins TSA | 2026–27",
    template: "%s | Elkins TSA",
  },
  description:
    "Elkins High School TSA chapter dashboard, deadlines, resources, and organization files for 2026–27.",
  icons: { icon: "/images/TSA_Logo-transparent.png" },
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
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
