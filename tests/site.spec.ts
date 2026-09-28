import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/announcements/",
  "/events/",
  "/resources/",
  "/sign-ups/",
  "/about/",
];
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 834, height: 1112 },
  { width: 390, height: 844 },
  { width: 320, height: 740 },
]) {
  test(`all pages render without overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header.site-header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `overflow on ${route}`,
      ).toBe(true);
      await page.screenshot({
        path: `test-results/screenshots/${viewport.width}-${route.replaceAll("/", "") || "home"}.png`,
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });
}
test("desktop navigation and checklist anchor", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  for (const label of [
    "Announcements",
    "Events",
    "Resources",
    "Sign-Ups",
    "About",
    "Home",
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page.locator("h1")).toBeVisible();
  }
  await page
    .getByRole("link", { name: "View Member Checklist", exact: true })
    .click();
  await expect(page).toHaveURL(/#checklist/);
  await expect(
    page.getByRole("heading", { name: "Become an official TSA member." }),
  ).toBeInViewport();
});
test("search keyboard, empty state, external forms and local navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const search = page.getByRole("combobox");
  await expect(search).toBeFocused();
  await search.fill("dues");
  await expect(page.getByRole("option")).toContainText("Pay $95 TSA dues");
  await search.fill("parent letter");
  await expect(page.getByRole("option").first()).toContainText(
    "Parent-Student Agreement",
  );
  await search.fill("coding");
  await expect(page.getByRole("option").first()).toContainText(
    "Software Development",
  );
  await search.fill("zzzzzz");
  await expect(page.getByText("No results for")).toBeVisible();
  await search.fill("meeting slides");
  await search.press("Enter");
  await expect(page).toHaveURL(/resources\/#meetings/);
  await page.keyboard.press("Control+k");
  await search.fill("officer applications");
  await search.press("Enter");
  await expect(page).toHaveURL(/about\/#leadership/);
  await page
    .getByRole("button", { name: "Search the website", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("event search and composable filters", async ({ page }) => {
  await page.goto("/events/");
  await expect(page.locator(".event-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Coding", exact: true }).click();
  await expect(page.locator(".event-card")).toHaveCount(1);
  await page.getByLabel("Event format").selectOption("Individual");
  await expect(page.getByText("No events found.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".event-card")).toHaveCount(3);
  await page
    .getByRole("textbox", { name: "Search events" })
    .fill("engineering");
  await expect(page.locator(".event-card")).toHaveCount(1);
});
test("mobile menu closes after navigation and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Resources" })
    .click();
  await expect(page).toHaveURL(/resources\//);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
test("countdown updates and switches at the exact Central Time deadline", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-01T04:58:00Z") });
  await page.goto("/");
  await expect(page.locator(".hero-countdown .countdown")).toHaveAttribute(
    "aria-label",
    "0 days, 0 hours, 1 minutes remaining",
  );
  await page.clock.fastForward(60000);
  await expect(page.locator(".deadline-strip")).toContainText(
    "membership deadline has passed",
  );
  await expect(page.locator(".hero-countdown")).toContainText(
    "MEMBERSHIP CLOSED",
  );
  await expect(page.locator(".hero-countdown .closed")).toHaveText(
    "Deadline passed",
  );
  await expect(page.locator(".checklist-footnote")).toContainText(
    "deadline has passed",
  );
});
test("countdown is an absolute instant across browser time zones", async ({
  browser,
}) => {
  const context = await browser.newContext({ timezoneId: "Asia/Tokyo" });
  const page = await context.newPage();
  await page.clock.install({ time: new Date("2026-09-28T04:59:00Z") });
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.locator(".hero-countdown .countdown")).toHaveAttribute(
    "aria-label",
    "3 days, 0 hours, 0 minutes remaining",
  );
  await context.close();
});
test("officer date stays open through its Central Time calendar date", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-02T04:59:00Z") });
  await page.goto("/about/");
  await expect(page.locator("#leadership .deadline-status")).toContainText(
    "Due today",
  );
  await page.clock.fastForward(60000);
  await expect(page.locator("#leadership .deadline-status")).toContainText(
    "Deadline passed",
  );
});
test("external links are identifiable and protected; no broken placeholders", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    for (const link of await page.locator('a[href^="http"]').all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      expect(await link.locator("svg.lucide-arrow-up-right").count()).toBe(1);
    }
  }
  await page.goto("/sign-ups/");
  await expect(
    page.getByRole("link", { name: "Open Full Spreadsheet" }).first(),
  ).toHaveAttribute(
    "href",
    "https://docs.google.com/spreadsheets/d/1JzBsV2bz8b6W2wM2s79yi831c82TB32lR4dH75gAWxo/edit?usp=sharing",
  );
  await expect(page.locator("iframe")).toHaveCount(0);
});
test("reduced motion and keyboard skip link", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content/);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("WCAG accessibility on all pages and search dialog", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const report = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      report.violations,
      JSON.stringify(
        report.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        null,
        2,
      ),
    ).toEqual([]);
  }
  await page
    .getByRole("button", { name: "Search the website", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCSS("opacity", "1");
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(report.violations).toEqual([]);
});
