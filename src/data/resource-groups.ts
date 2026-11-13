import { links } from "./links";

export interface ResourceItem {
  title: string;
  href?: string;
  note?: string;
  download?: boolean;
  id?: string;
}

export interface ResourceGroup {
  number: string;
  title: string;
  items: ResourceItem[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    number: "01",
    title: "Event information",
    items: [
      { title: "National TSA events website", href: links.nationalEvents },
      { title: "Themes and problems", href: links.themesAndProblems },
      {
        title: "Competitive Event Guide",
        href: "/documents/2027-2028-HS-Student-Member-Guide.pdf",
        download: true,
      },
      { title: "Team size information", href: links.teamSize },
      { title: "Texas TSA", href: links.texasTsa },
      { title: "Texas TSA events guide", href: links.texasEvents },
      { title: "Gulf Coast TSA", href: links.gulfCoastTsa },
    ],
  },
  {
    number: "02",
    title: "Organization quicklinks",
    items: [
      { title: "Workshop submission form", href: links.workshopSubmission },
      { title: "Event entries progress spreadsheet", href: links.eventEntriesProgress },
      { title: "Event entries spreadsheet", href: links.eventEntries },
      { id: "membership-spreadsheet", title: "Membership spreadsheet", href: links.membership },
      { title: "CTSO submission form", href: links.parentUpload },
      { title: "Pay dues", href: links.dues },
    ],
  },
  {
    number: "03",
    title: "Organization files",
    items: [
      {
        id: "ideation-worksheets",
        title: "Ideation worksheet projects",
        href: "/documents/Ideation-Worksheet-Projects.docx",
        download: true,
      },
      {
        title: "Ideation worksheet tests",
        href: "/documents/Ideation-Worksheet-Tests.docx",
        download: true,
      },
      {
        title: "Ideation workshop meeting",
        href: "/documents/meetings/Ideation-Workshop-Meeting.pdf",
        download: true,
      },
      {
        title: "Final sign-ups meeting",
        href: "/documents/meetings/Final%20Sign-ups%20(1).pdf",
        download: true,
      },
      {
        title: "Events meeting",
        href: "/documents/meetings/Events.pdf",
        download: true,
      },
      {
        title: "TSA interest meeting",
        href: "/documents/meetings/TSA%20Interest%20Meeting%20(1).pdf",
        download: true,
      },
    ],
  },
];
