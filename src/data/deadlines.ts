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
    introduction: "Membership dues and the Parent-Student Agreement for 2026–2027.",
    steps: membership.steps,
    note: "Search the final member list on the home page. Contact TSA leadership on BAND with membership questions.",
  },
  "change-drop-deadline": {
    introduction:
      "The deadline to change or drop a competitive event is October 10.",
    steps: [
      {
        title: "Confirm how to make a change or drop",
        description:
          "Contact TSA leadership on BAND for change/drop instructions before the deadline.",
        links: [],
      },
    ],
    note: "A specific cutoff time and change/drop submission process have not been posted here yet.",
  },
  "ideation-deadline": {
    introduction:
      "Ideation is due October 20. The Materials Workshop is also scheduled for this day.",
    steps: [
      {
        title: "Complete ideation",
        description: "Have your project idea ready by the ideation deadline.",
        links: [],
      },
    ],
    note: "Check with TSA leadership on BAND for submission instructions and workshop details.",
  },
  "materials-deadline": {
    introduction: "Project materials are due November 16.",
    steps: [
      {
        title: "Prepare your materials",
        description:
          "Have your project materials ready by the materials deadline.",
        links: [],
      },
    ],
    note: "Check with TSA leadership on BAND for materials requirements and submission instructions.",
  },
  "25-percent-checkpoint": {
    introduction: "The 25% project checkpoint is December 1.",
    steps: [
      {
        title: "Reach 25% completion",
        description: "Prepare your project progress for the 25% checkpoint.",
        links: [],
      },
    ],
    note: "Check with TSA leadership on BAND for checkpoint instructions.",
  },
  "50-percent-checkpoint": {
    introduction: "The 50% project checkpoint is December 15.",
    steps: [
      {
        title: "Reach 50% completion",
        description: "Prepare your project progress for the 50% checkpoint.",
        links: [],
      },
    ],
    note: "Check with TSA leadership on BAND for checkpoint instructions.",
  },
  "75-percent-checkpoint": {
    introduction:
      "The 75% project checkpoint is January 11. An in-house competition will be held that day if necessary.",
    steps: [
      {
        title: "Reach 75% completion",
        description: "Prepare your project progress for the 75% checkpoint.",
        links: [],
      },
    ],
    note: "Check with TSA leadership on BAND for checkpoint instructions and whether an in-house competition is needed.",
  },
  "project-submission-deadline": {
    introduction: "Projects are due January 26.",
    steps: [
      {
        title: "Submit your project",
        description:
          "Complete your project and submit it by the project submission deadline.",
        links: [],
      },
    ],
    note: "Check with TSA leadership on BAND for the submission method and cutoff time.",
  },
};
