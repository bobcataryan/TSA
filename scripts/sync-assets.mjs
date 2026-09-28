import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("public");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : path.join(dir, entry.name),
    ),
  );
  return nested.flat();
}
const files = (await walk(root)).sort();
const href = (file) =>
  "/" +
  path.relative(root, file).split(path.sep).map(encodeURIComponent).join("/");
const resources = files
  .filter((file) => /\.(pdf|pptx?|docx?)$/i.test(file))
  .map((file) => {
    const name = path.basename(file);
    const clean = name
      .replace(/\.[^.]+$/, "")
      .replace(/[+_]/g, " ")
      .replace(/[-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const parentAgreement = /parent.*(letter|agreement)|ctso/i.test(clean);
    const category = parentAgreement
      ? "Getting Started"
      : /officer|leadership/i.test(clean)
        ? "Leadership"
        : /meeting|intro|presentation|slides/i.test(clean)
          ? "Meetings"
          : "Competitions";
    return {
      id:
        clean.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
        "-" +
        Buffer.from(path.relative(root, file)).toString("base64url"),
      title: parentAgreement ? "2026–27 CTSO Parent-Student Agreement" : clean,
      description: parentAgreement
        ? "Print, sign, scan, and upload your completed agreement."
        : category === "Meetings"
          ? "Chapter meeting materials. Review these if you missed the meeting."
          : "Chapter document. Open the file for full details.",
      category,
      href: href(file),
      type: path.extname(file).slice(1).toUpperCase(),
      parentAgreement,
    };
  });
const logo = files.find(
  (file) =>
    /(?:tsa|logo)/i.test(path.basename(file)) &&
    /\.(png|jpe?g|webp|svg)$/i.test(file),
);
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/assets.generated.json",
  JSON.stringify({ logo: logo ? href(logo) : null, resources }, null, 2) + "\n",
);
console.log(
  `Assets indexed: ${resources.length} documents; TSA logo ${logo ? "found" : "not yet uploaded"}.`,
);
