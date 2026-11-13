"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/brand";
import { navigation } from "@/data/links";
export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header" data-home={pathname === "/" || undefined}>
      <div className="container navbar">
        <Link href="/" className="brand" aria-label="Elkins TSA home">
          <Brand />
          <span className="brand-name">Elkins High School TSA</span>
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
      </div>
    </header>
  );
}
