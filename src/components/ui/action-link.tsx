import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
export function ActionLink({
  href,
  children,
  variant = "text",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "text" | "primary" | "outline" | "light";
  className?: string;
}) {
  const external =
    /^https?:/.test(href) || /\.(pdf|pptx?|docx?)(?:$|\?)/i.test(href);
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "action-link",
        variant !== "text" && `button button-${variant}`,
        className,
      )}
    >
      {children}
      {external ? (
        <ArrowUpRight size={16} aria-label="opens in a new tab" />
      ) : (
        <ArrowRight size={16} aria-hidden="true" />
      )}
    </Link>
  );
}
