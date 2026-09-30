import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["/", "/events/", "/resources/", "/photogallery/"];
for (const width of [1440, 834, 390, 320]) {
  test(`site layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (e) => {
      // Google Sheets emits this telemetry error even when its preview table renders.
      // The live embed is verified separately below; do not suppress application errors.
      if (
        e.message === "DOCS_timing is not defined" &&
        e.stack?.includes("docs.google.com")
      )
        return;
      errors.push(e.message);
    });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(
        page
          .getByRole("navigation", { name: "Main navigation" })
          .getByRole("link"),
      ).toHaveCount(4);
      await expect(page.locator("footer")).toHaveCount(0);
      await page.screenshot({
        path: `test-results/screenshots/${width}-${route === "/" ? "dashboard" : route.replaceAll("/", "")}.png`,
        fullPage: true,
        mask: [page.locator("iframe")],
      });
    }
    expect(errors).toEqual([]);
  });
}
test("calendar selects dates, navigates months and returns to today", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-28T17:00:00Z") });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "September 2026" }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "September 30, 2026, Membership deadline",
      exact: true,
    })
    .click();
  await expect(page.locator(".selected-day")).toContainText(
    "11:59 PM Central Time",
  );
  await page.getByRole("button", { name: "Next month" }).click();
  await expect(
    page.getByRole("heading", { name: "October 2026" }),
  ).toBeVisible();
  await expect(page.locator(".selected-day")).toContainText(
    "Officer form sign-up deadline",
  );
  await page.getByRole("button", { name: "Previous month" }).click();
  await expect(
    page.getByRole("heading", { name: "September 2026" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Today", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "September 28, 2026, today, Parent information meeting",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".selected-day")).toContainText(
    "6:00–6:45 PM Central Time",
  );
});
test("membership actions and Events navigation work", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".member-steps>li")).toHaveCount(4);
  await expect(
    page.getByRole("link", { name: "Pay dues", exact: false }),
  ).toHaveAttribute("href", /revtrak.net/);
  await expect(
    page.getByRole("link", { name: "Open form", exact: false }),
  ).toHaveAttribute("href", "https://forms.gle/kYYZot62bJzpkAXG8");
  await expect(
    page.getByRole("link", { name: "Upload agreement", exact: false }),
  ).toHaveAttribute("href", "https://forms.gle/ATA9eu6MFgsCEpeh7");
  await expect(
    page.getByRole("link", { name: "Sign up for events" }),
  ).toHaveAttribute("href", "https://forms.gle/oqa34gXXsYJgGtP19");
  await expect(
    page.getByRole("link", { name: "Check membership progress" }),
  ).toHaveAttribute("href", /1XzrwVvncEfQUZJimHIfTzv4Nn_v6N_OtNYxX9q-J9OI/);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Events", exact: true })
    .click();
  await expect(page).toHaveURL(/events\//);
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://docs.google.com/spreadsheets/d/1JzBsV2bz8b6W2wM2s79yi831c82TB32lR4dH75gAWxo/preview",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Dashboard", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Chapter dashboard" }),
  ).toBeVisible();
});
test("event filters and information guide are retained", async ({ page }) => {
  await page.goto("/events/");
  await expect(page.locator(".event-card")).toHaveCount(42);
  const groups = page.locator("details.event-category");
  await expect(groups).toHaveCount(7);
  await expect(groups.first()).toHaveAttribute("open", "");
  await expect(groups.nth(1)).not.toHaveAttribute("open");
  await groups.nth(1).locator("summary").click();
  await expect(groups.nth(1)).toHaveAttribute("open", "");
  await groups.nth(1).locator("summary").click();
  await expect(groups.nth(1)).not.toHaveAttribute("open");
  await page.getByRole("button", { name: "Coding", exact: true }).click();
  await page.getByLabel("Search events").fill("Software Development");
  await expect(page.locator(".event-card")).toHaveCount(1);
  await expect(page.locator("details.event-category")).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".event-card-meta")).toContainText("2–6 people");
  await page.getByLabel("People per team").selectOption("1");
  await expect(page.getByText("No events found.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".event-card")).toHaveCount(42);
  await expect(page.getByText(/example|unconfirmed/i)).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "How to find event information" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open Full Spreadsheet" }),
  ).toHaveAttribute(
    "href",
    /1JzBsV2bz8b6W2wM2s79yi831c82TB32lR4dH75gAWxo\/edit/,
  );
});
test("removed pages are gone", async ({ page }) => {
  for (const path of ["/announcements/", "/sign-ups/", "/about/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  }
});
test("dashboard and event accessibility", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const report = await new AxeBuilder({ page })
      .exclude("iframe")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      report.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});
test("membership due message closes at the configured instant", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-01T04:58:59Z") });
  await page.goto("/");
  await expect(page.locator(".membership-due")).toContainText(
    "Complete all four by",
  );
  await page.clock.fastForward(1000);
  await expect(page.locator(".membership-due")).toContainText(
    "Membership deadline passed",
  );
});

test("the actual Google Sheet renders in the embed", async ({ page }) => {
  await page.goto("/events/");
  await page.locator("iframe").scrollIntoViewIfNeeded();
  const frame = page.frameLocator("iframe");
  await expect(frame.locator("table").first()).toBeVisible({ timeout: 20000 });
  await expect(frame.locator("body")).not.toContainText(
    /You need access|Unable to open the file/,
  );
});
