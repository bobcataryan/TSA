import Link from "next/link";
import { links, navigation } from "@/data/links";

const externalLinks = [
  { href: links.instagram, label: "Instagram" },
  { href: links.texasTsa, label: "Texas TSA" },
  { href: links.nationalTsa, label: "National TSA" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-top">
          <p className="footer-note">
            Technology Student Association
            <span>Elkins High School</span>
            <span>Missouri City, Texas</span>
          </p>
          <div className="footer-link-groups">
            <nav className="footer-link-group" aria-label="Footer navigation">
              <p className="footer-group-title">Navigate</p>
              {navigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="footer-link-group" aria-label="Elsewhere">
              <p className="footer-group-title">Elsewhere</p>
              {externalLinks.map((item) => (
                <a
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <p className="footer-wordmark">ELKINS TSA</p>
        <hr className="footer-rule" />
        <div className="footer-bottom">
          <p className="footer-credit">Developed by Aryan Goel</p>
        </div>
      </div>
    </footer>
  );
}
