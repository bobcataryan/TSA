import { membership } from "@/data/membership";
import { ActionLink } from "@/components/ui/action-link";
export function MemberChecklist() {
  return (
    <section
      className="membership-panel"
      id="checklist"
      aria-labelledby="checklist-title"
    >
      <div className="membership-top">
        <div className="membership-heading">
          <p className="panel-eyebrow">Membership</p>
          <h2 id="checklist-title">Dues &amp; agreement</h2>
          <p>Everything needed to finish your chapter requirements.</p>
        </div>
      </div>
      <ol className="member-steps">
        {membership.steps.map((step, index) => (
          <li key={step.title}>
            <span className="step-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="step-links">
                {step.links.map((link) => (
                  <ActionLink key={link.href} href={link.href}>
                    {link.label}
                  </ActionLink>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
