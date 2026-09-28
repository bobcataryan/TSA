import { ActionLink } from "@/components/ui/action-link";
export default function NotFound() {
  return (
    <div className="container section not-found">
      <p className="eyebrow">404 / Off the blueprint</p>
      <h1>Let’s get you back on track.</h1>
      <p>That page isn’t here. Find what you need from the chapter hub.</p>
      <ActionLink href="/" variant="primary">
        Back to Home
      </ActionLink>
    </div>
  );
}
