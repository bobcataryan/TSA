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
            ELKINS HIGH SCHOOL<small>Technology Student Association</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "")
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="school-year">2026—2027</span>
      </div>
    </header>
  );
}
