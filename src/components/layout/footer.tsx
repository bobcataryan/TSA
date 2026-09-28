import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { links, navigation } from "@/data/links";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <h2>Elkins High School TSA</h2>
            <p>
              Technology Student Association
              <br />
              2026–2027
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <nav aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3>Member essentials</h3>
            <nav aria-label="Useful links">
              {[
                ["Pay Dues", links.dues],
                ["Membership Form", links.membership],
                ["Parent Agreement Upload", links.parentUpload],
                ["Event Sign-Ups", links.signups],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                  <ArrowUpRight size={14} aria-label="opens in a new tab" />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Questions? Contact TSA leadership through BAND.</p>
          <span>Ideas into action. Together.</span>
        </div>
      </div>
    </footer>
  );
}
