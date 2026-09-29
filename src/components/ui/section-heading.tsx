import { ActionLink } from "./action-link";
export function SectionHeading({
  number,
  eyebrow,
  title,
  href,
  link,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && (
          <p className="eyebrow">
            {number && <span>{number} / </span>}
            {eyebrow}
          </p>
        )}
        <h2>{title}</h2>
      </div>
      {href && link && <ActionLink href={href}>{link}</ActionLink>}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  number = "01",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  number?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-intro">
      <div className="container page-intro-inner">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> Elkins TSA / {eyebrow}
          </p>
          <h1>{title}</h1>
          <p className="intro-description">{description}</p>
          {children}
        </div>
        <span className="page-number" aria-hidden="true">
          {number}
        </span>
      </div>
    </header>
  );
}
