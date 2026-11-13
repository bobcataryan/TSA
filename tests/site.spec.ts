import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/dashboard/", "/resources/"];

test("interior pages omit the decorative page header", async ({ page }) => {
  for (const route of ["/dashboard/", "/resources/"]) {
    await page.goto(route);
    await expect(page.locator(".interior-intro")).toHaveCount(0);
    await expect(page.locator(".page-number, .season-code")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("dashboard uses the approved clear-glass horizon treatment", async ({
  page,
}) => {
  await page.goto("/dashboard/");
  const stage = page.locator(".dashboard-stage");
  const calendar = page.locator(".calendar-panel");
  const todo = page.locator(".todo-panel");

  await expect(stage).toHaveAttribute("data-background", "horizon");
  const styles = await page.evaluate(() => {
    const stageStyle = getComputedStyle(
      document.querySelector<HTMLElement>(".dashboard-stage")!,
    );
    const calendarStyle = getComputedStyle(
      document.querySelector<HTMLElement>(".calendar-panel")!,
    );
    const todoStyle = getComputedStyle(
      document.querySelector<HTMLElement>(".todo-panel")!,
    );
    const calendarHighlight = getComputedStyle(
      document.querySelector<HTMLElement>(".calendar-panel")!,
      "::before",
    );
    const eventStyle = getComputedStyle(
      document.querySelector<HTMLElement>(".calendar-event")!,
    );
    const alpha = (value: string) =>
      Number.parseFloat(value.match(/[\d.]+(?=\))/)?.[0] ?? "1");
    return {
      attachment: stageStyle.backgroundAttachment,
      backgroundImage: stageStyle.backgroundImage,
      calendarAlpha: alpha(calendarStyle.backgroundColor),
      todoAlpha: alpha(todoStyle.backgroundColor),
      calendarBlur: calendarStyle.backdropFilter,
      calendarRadius: Number.parseFloat(calendarStyle.borderRadius),
      highlightImage: calendarHighlight.backgroundImage,
      eventRadius: Number.parseFloat(eventStyle.borderRadius),
      eventShadow: eventStyle.boxShadow,
    };
  });
  expect(styles.backgroundImage).toContain("dashboard-horizon.webp");
  expect(
    styles.attachment.split(", ").every((value) => value === "scroll"),
  ).toBe(true);
  expect(styles.calendarAlpha).toBeLessThanOrEqual(0.15);
  expect(styles.todoAlpha).toBeLessThanOrEqual(0.15);
  expect(styles.calendarBlur).toMatch(/blur\((4[4-9]|[5-9]\d)px\)/);
  expect(styles.calendarRadius).toBeGreaterThanOrEqual(28);
  expect(styles.highlightImage).toContain("radial-gradient");
  expect(styles.eventRadius).toBeGreaterThanOrEqual(6);
  expect(styles.eventShadow).not.toBe("none");
  await expect(calendar).toBeVisible();
  await expect(todo).toBeVisible();
});

for (const width of [1440, 834, 390, 320]) {
  test(`three-page site fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(
        page
          .getByRole("navigation", { name: "Main navigation" })
          .getByRole("link"),
      ).toHaveCount(3);
      await expect(page.locator("footer")).toContainText(
        "Developed by Aryan Goel",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.waitForTimeout(950);
      await page.screenshot({
        path: `test-results/screenshots/rebuild-${width}-${route === "/" ? "home" : route.replaceAll("/", "")}.png`,
        fullPage: true,
      });
    }

    expect(errors).toEqual([]);
  });
}

test("home stacks its headline, solar system, and action in that order", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("/");

  const title = page.locator(".home-title");
  const field = page.locator(".project-field");
  const action = page.locator(".home-action");
  await expect(title).toBeVisible();
  await expect(field).toHaveAttribute("data-scene-ready", "true");
  await expect(action).toBeVisible();

  const [titleBox, fieldBox, actionBox] = await Promise.all([
    title.boundingBox(),
    field.boundingBox(),
    action.boundingBox(),
  ]);
  expect(titleBox).not.toBeNull();
  expect(fieldBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(fieldBox!.y + 2);
  const actionGap = actionBox!.y - (fieldBox!.y + fieldBox!.height);
  expect(actionGap).toBeGreaterThanOrEqual(-40);
  expect(actionGap).toBeLessThanOrEqual(16);
});

test("home has one clear dashboard action and a decorative motion field", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator(".home-hero");
  await expect(
    page.getByRole("heading", { name: "Build what matters." }),
  ).toBeVisible();
  await expect(
    page.getByText("Everything you need in one place.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".home-kicker, .home-frame, .home-scroll"),
  ).toHaveCount(0);
  await expect(
    page.locator(".field-telemetry, .school-year, .footer-season"),
  ).toHaveCount(0);
  await expect(page.locator(".nav-index")).toHaveCount(0);
  await expect(hero.getByRole("link")).toHaveCount(1);
  await expect(
    hero.getByRole("link", { name: "Open dashboard" }),
  ).toHaveAttribute("href", /\/dashboard\/?$/);
  const field = page.locator(".project-field");
  const canvas = page.locator("canvas.solar-system-canvas");
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute("aria-hidden", "true");
  await expect(field).toHaveAttribute("data-renderer", "three");
  await expect(field).toHaveAttribute("data-scene-ready", "true");
  await expect(field).toHaveAttribute("data-orbit-count", "6");
  await expect(field).toHaveAttribute("data-body-count", "6");
  await expect(field).toHaveAttribute(
    "data-centerpiece-mode",
    "logo-bas-relief",
  );
  await expect(field).toHaveAttribute(
    "data-centerpiece-surface",
    "displaced-logo-artwork",
  );
  await expect(field).toHaveAttribute(
    "data-centerpiece-lighting",
    "soft-white-gradient-halo",
  );
  await expect(field).toHaveAttribute("data-centerpiece-center-depth", "0");
  await expect(field).toHaveAttribute("data-camera-presentation", "low-angle");
  await expect(field).toHaveAttribute(
    "data-camera-framing",
    "adaptive-horizontal-safe",
  );
  await expect(field).toHaveAttribute("data-minimum-orbit-gap", "1.5");
  await expect(field).toHaveAttribute("data-minimum-orbit-radius", "4");
  await expect(field).toHaveAttribute("data-minimum-planet-radius", "0.58");
  await expect(field).toHaveAttribute(
    "data-orbit-model",
    "horizontal-depth-plane",
  );
  await expect(field).toHaveAttribute("data-orbit-plane-axis", "xz");
  await expect(field).toHaveAttribute("data-orbit-depth-range", "23");
  await expect(field).toHaveAttribute("data-orbit-plane-count", "1");
  await expect(field).toHaveAttribute("data-planet-material-count", "6");
  await expect(field).toHaveAttribute("data-depth-occlusion", "enabled");
  await expect(field).toHaveAttribute("data-animation-loop", "running");
  await expect(field).toHaveAttribute(
    "data-interaction",
    "planet-hover-freeze-lift-spin",
  );
  await expect(page.locator(".project-field-canvas, .field-core")).toHaveCount(
    0,
  );
  expect(
    await canvas.evaluate((element) => {
      const target = element as HTMLCanvasElement;
      return Boolean(target.getContext("webgl2") || target.getContext("webgl"));
    }),
  ).toBe(true);

  const ctaBackground = await hero
    .getByRole("link", { name: "Open dashboard" })
    .evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(ctaBackground).toContain("linear-gradient");
  await expect(page.locator(".hero-carousel")).toHaveCount(0);
});

test("home uses one headline family and reserves the italic serif for its summary", async ({
  page,
}) => {
  await page.goto("/");

  const typography = await page.evaluate(() => {
    const build = document.querySelector<HTMLElement>(".home-title span");
    const matters = document.querySelector<HTMLElement>(".home-title em");
    const summary = document.querySelector<HTMLElement>(".home-summary");
    if (!build || !matters || !summary) throw new Error("Hero type is missing");
    const buildStyle = getComputedStyle(build);
    const mattersStyle = getComputedStyle(matters);
    const summaryStyle = getComputedStyle(summary);
    const buildBox = build.getBoundingClientRect();
    const mattersBox = matters.getBoundingClientRect();
    return {
      buildFamily: buildStyle.fontFamily,
      buildSize: Number.parseFloat(buildStyle.fontSize),
      buildWeight: Number.parseInt(buildStyle.fontWeight, 10),
      mattersFamily: mattersStyle.fontFamily,
      mattersSize: Number.parseFloat(mattersStyle.fontSize),
      mattersWeight: Number.parseInt(mattersStyle.fontWeight, 10),
      mattersStyle: mattersStyle.fontStyle,
      mattersTransform: mattersStyle.textTransform,
      summaryFamily: summaryStyle.fontFamily,
      summaryStyle: summaryStyle.fontStyle,
      stacked: mattersBox.top >= buildBox.bottom,
    };
  });

  expect(typography.mattersFamily).toBe(typography.buildFamily);
  expect(typography.mattersSize / typography.buildSize).toBeGreaterThanOrEqual(
    0.9,
  );
  expect(typography.mattersSize / typography.buildSize).toBeLessThanOrEqual(
    1.1,
  );
  expect(typography.mattersWeight).toBeGreaterThanOrEqual(700);
  expect(typography.mattersWeight).toBe(typography.buildWeight);
  expect(typography.mattersStyle).toBe("normal");
  expect(typography.mattersTransform).toBe("uppercase");
  expect(typography.stacked).toBe(true);
  expect(typography.summaryFamily).toContain("Georgia");
  expect(typography.summaryStyle).toBe("italic");
});

test("home uses a compact title lockup and refined navigation rail", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("/");

  const treatment = await page.evaluate(() => {
    const build = document.querySelector<HTMLElement>(".home-title span")!;
    const matters = document.querySelector<HTMLElement>(".home-title em")!;
    const nav = document.querySelector<HTMLElement>(".navbar nav")!;
    const current = nav.querySelector<HTMLElement>('[aria-current="page"]')!;
    const buildBox = build.getBoundingClientRect();
    const mattersBox = matters.getBoundingClientRect();
    return {
      lineGap: mattersBox.top - buildBox.bottom,
      widthRatio: mattersBox.width / buildBox.width,
      navRadius: Number.parseFloat(getComputedStyle(nav).borderRadius),
      navBackground: getComputedStyle(nav).backgroundColor,
      currentRadius: Number.parseFloat(getComputedStyle(current).borderRadius),
    };
  });

  expect(treatment.lineGap).toBeLessThanOrEqual(2);
  expect(treatment.lineGap).toBeGreaterThanOrEqual(-10);
  expect(treatment.widthRatio).toBeGreaterThan(1.6);
  expect(treatment.navRadius).toBeGreaterThanOrEqual(18);
  expect(treatment.navBackground).not.toBe("rgba(0, 0, 0, 0)");
  expect(treatment.currentRadius).toBeGreaterThanOrEqual(14);
  await expect(page.locator(".project-field")).toHaveAttribute(
    "data-orbit-line-color",
    "#a8b2bd",
  );
  await expect(page.locator(".project-field")).toHaveAttribute(
    "data-orbit-line-opacity",
    "0.26",
  );
});

test("home uses a solid field behind multi-direction shooting stars and readable orbit labels", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator(".home-hero");
  const field = page.locator(".project-field");
  await expect(field).toHaveAttribute("data-scene-ready", "true");

  const background = await hero.evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.backgroundColor, image: style.backgroundImage };
  });
  expect(background.image).toBe("none");
  expect(background.color).toBe("rgb(10, 12, 11)");
  await expect(field).toHaveAttribute("data-comet-count", "3");
  await expect(field).toHaveAttribute("data-comet-direction-count", "3");
  await expect(field).toHaveAttribute(
    "data-comet-motion",
    "multi-direction-shooting-stars",
  );
  await expect(field).toHaveAttribute(
    "data-centerpiece-lighting",
    "soft-white-gradient-halo",
  );
  await expect(field).toHaveAttribute(
    "data-centerpiece-orientation",
    "camera-facing-fixed",
  );
  expect(
    Number(await field.getAttribute("data-centerpiece-glow-opacity")),
  ).toBeGreaterThanOrEqual(0.55);
  expect(
    Number(await field.getAttribute("data-comet-travel-duration-max-ms")),
  ).toBeLessThanOrEqual(900);
  expect(
    Number(await field.getAttribute("data-comet-quiet-gap-min-ms")),
  ).toBeGreaterThanOrEqual(2000);
  await expect(field).toHaveAttribute(
    "data-planet-label-font-family",
    "Geist Variable",
  );
  await expect(field).toHaveAttribute("data-planet-label-font-size", "56");
  await expect(field).toHaveAttribute("data-planet-label-mobile-scale", "1.55");
  await expect(field).toHaveAttribute("data-planet-label-width", "2");
});

test("shared header uses a prominent one-line chapter brand", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const brand = page.getByRole("link", { name: "Elkins TSA home" });
  await expect(brand).toContainText("Elkins High School TSA");
  await expect(brand.locator("small")).toHaveCount(0);

  const metrics = await brand.evaluate((element) => {
    const logo = element.querySelector<HTMLElement>(".brand-logo");
    const name = element.querySelector<HTMLElement>(".brand-name");
    if (!logo || !name) throw new Error("Header brand is incomplete");
    return {
      fontSize: Number.parseFloat(getComputedStyle(name).fontSize),
      fontWeight: Number.parseInt(getComputedStyle(name).fontWeight, 10),
      letterSpacing: Number.parseFloat(getComputedStyle(name).letterSpacing),
      logoWidth: logo.getBoundingClientRect().width,
      singleLine: name.scrollWidth <= name.clientWidth,
      whiteSpace: getComputedStyle(name).whiteSpace,
      headerHeight: element.closest("header")!.getBoundingClientRect().height,
    };
  });

  expect(metrics.logoWidth).toBeGreaterThanOrEqual(58);
  expect(metrics.fontSize).toBeGreaterThanOrEqual(16);
  expect(metrics.fontWeight).toBeLessThanOrEqual(600);
  expect(metrics.letterSpacing).toBeGreaterThan(0);
  expect(metrics.singleLine).toBe(true);
  expect(metrics.whiteSpace).toBe("nowrap");
  expect(metrics.headerHeight).toBeLessThanOrEqual(80);
});

test("footer balances its links with restrained chapter context", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const footer = page.locator("footer");
  const note = footer.locator(".footer-note");
  const groups = footer.locator(".footer-link-groups");

  await expect(note).toContainText("Technology Student Association");
  await expect(note).toContainText("Elkins High School");
  const [noteBox, groupsBox] = await Promise.all([
    note.boundingBox(),
    groups.boundingBox(),
  ]);
  expect(noteBox).not.toBeNull();
  expect(groupsBox).not.toBeNull();
  expect(noteBox!.x + noteBox!.width).toBeLessThan(groupsBox!.x);
});

test("footer uses chapter navigation, official links, wordmark, and credit", async ({
  page,
}) => {
  await page.setViewportSize({ width: 834, height: 950 });
  await page.goto("/");
  const footer = page.locator("footer");
  const navigate = footer.getByRole("navigation", {
    name: "Footer navigation",
  });
  const elsewhere = footer.getByRole("navigation", {
    name: "Elsewhere",
  });

  await expect(navigate.getByRole("link")).toHaveCount(3);
  await expect(navigate.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  );
  await expect(
    navigate.getByRole("link", { name: "Dashboard" }),
  ).toHaveAttribute("href", /\/dashboard\/?$/);
  await expect(
    navigate.getByRole("link", { name: "Resources" }),
  ).toHaveAttribute("href", /\/resources\/?$/);
  await expect(navigate.getByRole("link", { name: "About" })).toHaveCount(0);

  await expect(elsewhere.getByRole("link")).toHaveCount(3);
  await expect(
    elsewhere.getByRole("link", { name: "Instagram" }),
  ).toHaveAttribute("href", "https://www.instagram.com/");
  await expect(
    elsewhere.getByRole("link", { name: "Texas TSA" }),
  ).toHaveAttribute("href", "https://texastsa.org/");
  await expect(
    elsewhere.getByRole("link", { name: "National TSA" }),
  ).toHaveAttribute("href", "https://tsaweb.org/");
  for (const link of await elsewhere.getByRole("link").all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
  }

  await expect(footer.getByText("ELKINS TSA", { exact: true })).toBeVisible();
  await expect(footer.getByRole("separator")).toBeVisible();
  await expect(footer).toContainText("Developed by Aryan Goel");
  await expect(footer.getByText("EHS / TSA", { exact: true })).toHaveCount(0);

  const [groupsBox, wordmarkBox] = await Promise.all([
    footer.locator(".footer-link-groups").boundingBox(),
    footer.locator(".footer-wordmark").boundingBox(),
  ]);
  expect(groupsBox).not.toBeNull();
  expect(wordmarkBox).not.toBeNull();
  expect(
    wordmarkBox!.y - (groupsBox!.y + groupsBox!.height),
  ).toBeGreaterThanOrEqual(20);
});

test("hovering a rendered planet activates its physical focus state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const field = page.locator(".project-field");
  const canvas = page.locator("canvas.solar-system-canvas");
  await expect(field).toHaveAttribute("data-scene-ready", "true");
  const box = await canvas.boundingBox();
  expect(box).not.toBeNull();

  let hovered = "";
  for (let y = 180; y <= 760 && !hovered; y += 24) {
    for (let x = 700; x <= 1390 && !hovered; x += 24) {
      await page.mouse.move(x, y);
      hovered = (await field.getAttribute("data-hovered-body")) ?? "";
    }
  }

  expect(hovered).toMatch(/^(CAD|VIDEO|CODE|BUILD|DESIGN|DATA)$/);
  await expect(field).toHaveAttribute("data-hover-state", "active");
  await page.waitForTimeout(350);
  await page.screenshot({
    path: "test-results/screenshots/rebuild-1440-home-hover.png",
    fullPage: true,
  });
  await page.mouse.move(20, 20);
  await expect(field).toHaveAttribute("data-hover-state", "idle");
});

test("home motion field becomes still for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".project-field")).toHaveAttribute(
    "data-motion",
    "reduced",
  );
  await expect(page.locator(".project-field")).toHaveAttribute(
    "data-animation-loop",
    "paused",
  );
});

test("dashboard calendar contains the full 2026-27 schedule", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-11-10T18:00:00Z") });
  await page.goto("/dashboard/");
  await expect(
    page.getByRole("heading", { name: "November 2026" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "November 17, 2026, Project building meeting",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "November 24, 2026, Ideation deadline",
      exact: true,
    })
    .click();
  await expect(page.locator(".selected-day")).toContainText(
    "Ideation deadline",
  );

  await page.getByRole("button", { name: "Next month" }).click();
  await expect(
    page.getByRole("heading", { name: "December 2026" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "December 1, 2026, 25% checkpoint" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "December 15, 2026, 50% checkpoint" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next month" }).click();
  await expect(
    page.getByRole("heading", { name: "January 2027" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "January 19, 2027, 75% checkpoint and in-house competition",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "January 26, 2027, Project submission deadline",
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next month" }).click();
  await expect(
    page.getByRole("button", {
      name: /February 12, 2027, Regional conference/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: /February 13, 2027, Regional conference/,
    }),
  ).toBeVisible();

  for (let index = 0; index < 2; index += 1) {
    await page.getByRole("button", { name: "Next month" }).click();
  }
  await expect(page.getByRole("heading", { name: "April 2027" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /April 19, 2027, State conference/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /April 22, 2027, State conference/ }),
  ).toBeVisible();

  for (let index = 0; index < 2; index += 1) {
    await page.getByRole("button", { name: "Next month" }).click();
  }
  await expect(page.getByRole("heading", { name: "June 2027" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /June 23, 2027, National conference/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /June 27, 2027, National conference/ }),
  ).toBeVisible();
});

test("dashboard presents exactly four chapter actions", async ({ page }) => {
  await page.goto("/dashboard/");
  const tasks = page.locator(".todo-list > li");
  await expect(tasks).toHaveCount(4);
  await expect(tasks).toContainText([
    "Ideation workshop",
    "Check membership",
    "Pay dues",
    "Upload CTSO agreement",
  ]);
  await expect(page.getByRole("link", { name: "Pay dues" })).toHaveAttribute(
    "href",
    /revtrak\.net/,
  );
  await expect(
    page.getByRole("link", { name: "Upload CTSO agreement" }),
  ).toHaveAttribute("href", "https://forms.gle/ATA9eu6MFgsCEpeh7");
});

test("resources use three columns and never expose fake links", async ({
  page,
  request,
}) => {
  await page.goto("/resources/");
  await expect(page.locator(".resource-column")).toHaveCount(3);
  const resourceTreatment = await page.evaluate(() => {
    const stage = getComputedStyle(
      document.querySelector<HTMLElement>(".resources-stage")!,
    );
    const column = getComputedStyle(
      document.querySelector<HTMLElement>(".resource-column")!,
    );
    return {
      stageImage: stage.backgroundImage,
      columnBlur: column.backdropFilter,
      columnRadius: Number.parseFloat(column.borderRadius),
      columnAlpha: Number.parseFloat(
        column.backgroundColor.match(/[\d.]+(?=\))/)?.[0] ?? "1",
      ),
      columnLayout: getComputedStyle(
        document.querySelector<HTMLElement>(".resource-columns")!,
      ).gridTemplateColumns,
    };
  });
  expect(resourceTreatment.stageImage).toContain("linear-gradient");
  expect(resourceTreatment.stageImage).not.toContain("dashboard-horizon.webp");
  expect(resourceTreatment.columnBlur).toBe("none");
  expect(resourceTreatment.columnRadius).toBe(0);
  expect(resourceTreatment.columnAlpha).toBeLessThanOrEqual(0.03);
  expect(resourceTreatment.columnLayout.split(" ")).toHaveLength(3);
  await expect(page.locator(".resource-cursor")).toHaveCount(0);
  const firstResource = page.getByRole("link", {
    name: "National TSA events website",
  });
  await firstResource.hover({ position: { x: 40, y: 20 } });
  await expect(firstResource).toHaveCSS("transform", /matrix3d/);
  await expect(firstResource).not.toHaveCSS("box-shadow", "none");
  const search = page.getByRole("searchbox", { name: "Find a resource" });
  await search.fill("pay dues");
  await expect(page.locator(".resource-column")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Pay dues" })).toBeVisible();
  await expect(page.getByText("1 resource", { exact: true })).toBeVisible();
  await expect(page.getByText("No matches in this section.")).toHaveCount(2);
  await search.fill("not a real resource");
  await expect(page.getByText("No matches in this section.")).toHaveCount(3);
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.locator(".resource-column")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Event information" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Organization quicklinks" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Organization files" }),
  ).toBeVisible();
  await expect(page.getByText("Link pending", { exact: true })).toHaveCount(0);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  const columns = page.locator(".resource-column");
  expect(
    await columns.nth(0).locator("li > a > span").allTextContents(),
  ).toEqual([
    "National TSA events website",
    "Themes and problems",
    "Competitive Event Guide",
    "Team size information",
    "Texas TSA",
    "Texas TSA events guide",
    "Gulf Coast TSA",
  ]);
  expect(
    await columns.nth(1).locator("li > a > span").allTextContents(),
  ).toEqual([
    "Workshop submission form",
    "Event entries progress spreadsheet",
    "Event entries spreadsheet",
    "Membership spreadsheet",
    "CTSO submission form",
    "Pay dues",
  ]);
  expect(
    await columns.nth(2).locator("li > a > span").allTextContents(),
  ).toEqual([
    "Ideation worksheet projects",
    "Ideation worksheet tests",
    "Ideation workshop meeting",
    "Final sign-ups meeting",
    "Events meeting",
    "TSA interest meeting",
  ]);
  for (const file of [
    "/documents/2027-2028-HS-Student-Member-Guide.pdf",
    "/documents/Ideation-Worksheet-Projects.docx",
    "/documents/Ideation-Worksheet-Tests.docx",
    "/documents/meetings/Ideation-Workshop-Meeting.pdf",
  ]) {
    expect((await request.get(file)).ok()).toBe(true);
  }
});

test("obsolete pages are removed", async ({ page }) => {
  for (const path of [
    "/events/",
    "/photogallery/",
    "/announcements/",
    "/sign-ups/",
    "/about/",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  }
});

test("pages remain usable with 200 percent text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 950 });
  for (const route of routes) {
    await page.goto(route);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole("main")).toBeVisible();
  }
});

test("all requested pages pass automated accessibility checks", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const report = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      report.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});
