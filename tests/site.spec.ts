import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["/", "/events/", "/resources/", "/photogallery/"];
for (const width of [1440, 834, 390, 320]) {
  test(`site layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (e) => {
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
  await expect(page.locator(".selected-day")).toContainText("No events");
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
test("final member list search and membership actions work", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".membership-panel .member-steps>li")).toHaveCount(2);
  await expect(page.locator(".member-name-grid>li")).toHaveCount(163);
  await page.getByRole("searchbox", { name: "Search final member list by name" }).fill("aryan goel");
  await expect(page.locator(".member-name-grid>li")).toHaveText(["Aryan Goel"]);
  await expect(page.getByRole("status")).toHaveText("1 match");
  await page.getByRole("searchbox", { name: "Search final member list by name" }).fill("not a member");
  await expect(page.getByText(/No names match/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Pay dues", exact: false }),
  ).toHaveAttribute("href", /revtrak.net/);
  await expect(
    page.getByRole("link", { name: "Upload agreement", exact: false }),
  ).toHaveAttribute("href", "https://forms.gle/ATA9eu6MFgsCEpeh7");
  await expect(
    page.getByRole("link", { name: "Download agreement PDF" }),
  ).toHaveAttribute(
    "href",
    "/documents/2026-27-CTSO-Parent-Student-Agreement.pdf",
  );
  await expect(page.getByText("Membership form")).toHaveCount(0);
  await expect(page.getByText("Event sign-ups")).toHaveCount(0);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Events", exact: true })
    .click();
  await expect(page).toHaveURL(/events\//);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Members", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "2026–27 membership." }),
  ).toBeVisible();
});
test("parent-student agreement is available in chapter files", async ({
  page,
  request,
}) => {
  await page.goto("/resources/");
  const file = page.getByRole("link", {
    name: "2026–27 CTSO Parent-Student Agreement opens in a new tab",
    exact: true,
  });
  await expect(file).toHaveAttribute(
    "href",
    "/documents/2026-27-CTSO-Parent-Student-Agreement.pdf",
  );
  await expect(
    page.getByRole("link", {
      name: "Download 2026–27 CTSO Parent-Student Agreement",
    }),
  ).toHaveAttribute("download", "");
  const response = await request.get(
    "/documents/2026-27-CTSO-Parent-Student-Agreement.pdf",
  );
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
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
  await expect(page.getByText("Event sign-ups")).toHaveCount(0);
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
