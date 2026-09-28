import { links } from "./links";
import { membership } from "./membership";

interface DeadlineDetails {
  introduction: string;
  steps: {
    title: string;
    description: string;
    links: { label: string; href: string }[];
    note?: string;
  }[];
  note: string;
}

export const deadlineDetails: Record<string, DeadlineDetails> = {
  "membership-deadline": {
    introduction: "Complete all four steps to join Elkins TSA for 2026–2027.",
    steps: membership.steps,
    note: "All four steps are required. No exceptions. Contact TSA leadership on BAND with membership questions.",
  },
  "officer-form-deadline": {
    introduction: "Submit your officer form sign-up by October 1.",
    steps: [
      {
        title: "Officer form sign-up",
        description:
          "Contact TSA leadership on BAND for the officer form and application instructions.",
        links: [],
      },
    ],
    note: "The officer form link and a specific cutoff time have not been posted here yet.",
  },
  "change-drop-deadline": {
    introduction:
      "The deadline to change or drop a competitive event is October 10.",
    steps: [
      {
        title: "Review your event sign-ups",
        description:
          "Find your event tabs in the chapter spreadsheet and check your current sign-ups.",
        links: [{ label: "Open event sign-ups", href: links.signups }],
      },
      {
        title: "Confirm how to make a change or drop",
        description:
          "Contact TSA leadership on BAND for change/drop instructions before the deadline.",
        links: [],
      },
    ],
    note: "A specific cutoff time and change/drop submission process have not been posted here yet.",
  },
};
