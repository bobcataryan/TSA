import Image from "next/image";
import { site } from "@/data/site";
export function Brand({ large = false }: { large?: boolean }) {
  if (site.logo)
    return (
      <Image
        src={site.logo}
        alt="Technology Student Association"
        width={large ? 260 : 64}
        height={large ? 180 : 44}
        className={large ? "hero-logo" : "brand-logo"}
        priority
      />
    );
  return (
    <span
      className={large ? "brand-type brand-type-large" : "brand-type"}
      aria-label="TSA"
    >
      TSA
      <span className="brand-underline" />
    </span>
  );
}
