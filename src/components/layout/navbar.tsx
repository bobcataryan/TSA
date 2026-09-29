"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/brand";
import { navigation } from "@/data/links";
export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container navbar">
        <Link href="/" className="brand" aria-label="Elkins TSA dashboard">
          <Brand />
          <span>
            ELKINS<small>High School TSA</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "")
                  ? "page"
                  : undefined
              }
            >
              <span className="nav-number" aria-hidden="true">
                0{index + 1}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="school-year">
          <span className="status-dot" /> 26—27
        </span>
      </div>
    </header>
  );
}
