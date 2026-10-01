import { links } from "./links";
export const membership = {
  steps: [
    {
      title: "Pay TSA dues",
      description: "$95 annual dues through RevTrak.",
      links: [{ label: "Pay dues", href: links.dues }],
    },
    {
      title: "Parent-Student Agreement",
      description: "Print, sign, scan, and upload your agreement.",
      links: [
        { label: "Download agreement PDF", href: links.parentAgreement },
        { label: "Upload agreement", href: links.parentUpload },
      ],
    },
  ],
};
