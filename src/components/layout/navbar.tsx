"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/links";
import { Brand } from "@/components/ui/brand";
import { SiteSearch } from "./search";
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar">
        <Link href="/" className="brand" aria-label="Elkins TSA home">
          <Brand />
          <span>
            ELKINS HIGH SCHOOL<small>Technology Student Association</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={pathname === item.href ? "active" : ""}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <SiteSearch />
          <Link className="nav-checklist" href="/#checklist">
            Member Checklist
            <ArrowUpRight size={15} />
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="mobile-menu-button icon-button"
                aria-label="Open navigation"
              >
                <Menu size={22} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="mobile-menu">
                <div className="mobile-menu-top">
                  <Dialog.Title>Elkins TSA</Dialog.Title>
                  <Dialog.Close
                    className="icon-button"
                    aria-label="Close navigation"
                  >
                    <X />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Navigate the Elkins TSA website.
                </Dialog.Description>
                <nav aria-label="Mobile navigation">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <span>0{index + 1}</span>
                      {item.label}
                      <ArrowUpRight size={18} />
                    </Link>
                  ))}
                </nav>
                <Link
                  href="/#checklist"
                  className="button button-primary"
                  onClick={() => setOpen(false)}
                >
                  Member Checklist
                  <ArrowUpRight size={16} />
                </Link>
                <p className="muted">2026–2027 · Build. Compete. Lead.</p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
