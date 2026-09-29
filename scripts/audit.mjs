/**
 * Visual + interaction audit for Al Shukr Dairy homepage.
 * Run: node scripts/audit.mjs
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE_URL || "http://localhost:3002";
const OUT = path.join(__dirname, "..", ".impeccable", "audit");

const SECTIONS = [
  { id: "top", name: "hero" },
  { id: "about", name: "about" },
  { id: "process", name: "process" },
  { id: "products", name: "products" },
  { id: "delivery", name: "delivery" },
  { id: "contact", name: "contact" },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function auditViewport(browser, label, viewport) {
  const findings = [];
  const consoleErrors = [];
  const pageErrors = [];

  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce", // stable screenshots
  });
  const page = await context.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));

  const res = await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  if (!res || !res.ok()) {
    findings.push({
      severity: "critical",
      area: "load",
      message: `Page failed to load: ${res?.status()}`,
    });
  }

  await page.waitForTimeout(800);

  // Title / meta
  const title = await page.title();
  if (!/Al Shukr/i.test(title)) {
    findings.push({
      severity: "major",
      area: "meta",
      message: `Unexpected title: ${title}`,
    });
  }

  // Required sections present
  for (const s of SECTIONS) {
    const el = page.locator(`#${s.id}`);
    const count = await el.count();
    if (count === 0) {
      findings.push({
        severity: "critical",
        area: s.name,
        message: `Missing section #${s.id}`,
      });
    }
  }

  // Hero copy
  const heroText = await page.locator("#top").innerText();
  for (const needle of ["Pure Milk", "Request Free Sample", "No Additives"]) {
    if (!heroText.includes(needle)) {
      findings.push({
        severity: "major",
        area: "hero",
        message: `Hero missing text: "${needle}"`,
      });
    }
  }

  // Nav links
  const navLinks = ["About", "Process", "Products", "Delivery", "Contact"];
  for (const link of navLinks) {
    const n = await page.locator(`header a:text-is("${link}")`).count();
    if (n === 0 && viewport.width >= 1024) {
      findings.push({
        severity: "major",
        area: "navbar",
        message: `Desktop nav missing link: ${link}`,
      });
    }
  }

  // Horizontal overflow check
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflowBy: doc.scrollWidth - doc.clientWidth,
    };
  });
  if (overflow.overflowBy > 2) {
    findings.push({
      severity: "major",
      area: "layout",
      message: `Horizontal overflow: ${overflow.overflowBy}px`,
    });
  }

  // Capture full + per-section shots
  const shotDir = path.join(OUT, label);
  ensureDir(shotDir);
  await page.screenshot({
    path: path.join(shotDir, "00-full.png"),
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(shotDir, "00-hero.png"),
    fullPage: false,
  });

  for (const s of SECTIONS) {
    const loc = page.locator(`#${s.id}`);
    if ((await loc.count()) === 0) continue;
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await page.screenshot({
      path: path.join(shotDir, `${s.name}.png`),
      fullPage: false,
    });
  }

  // Footer
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(shotDir, "footer.png"),
    fullPage: false,
  });

  // Interaction: mobile menu
  if (viewport.width < 1024) {
    const burger = page.locator('header button[aria-label="Open menu"]');
    if ((await burger.count()) > 0) {
      await burger.click();
      await page.waitForTimeout(500);
      const menuVisible = await page
        .locator('[data-testid="mobile-nav"] a:text-is("About")')
        .isVisible();
      if (!menuVisible) {
        findings.push({
          severity: "major",
          area: "mobile-menu",
          message: "Mobile menu did not show About link after open",
        });
      }
      await page.screenshot({
        path: path.join(shotDir, "mobile-menu.png"),
        fullPage: false,
      });
      const closer = page.locator('header button[aria-label="Close menu"]');
      if ((await closer.count()) > 0) await closer.click();
    } else {
      findings.push({
        severity: "major",
        area: "mobile-menu",
        message: "Hamburger button missing on mobile",
      });
    }
  }

  // Interaction: contact form validation
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const submit = page.locator('#contact button[type="submit"]');
  if ((await submit.count()) > 0) {
    await submit.click();
    await page.waitForTimeout(500);
    const hasNameErr = (await page.locator('[data-testid="error-name"]').count()) > 0;
    if (!hasNameErr) {
      findings.push({
        severity: "major",
        area: "contact-form",
        message: "Empty submit did not show name validation message",
      });
    }
    await page.screenshot({
      path: path.join(shotDir, "contact-validation.png"),
      fullPage: false,
    });

    // Success path
    await page.locator('#contact input[name="name"]').fill("Test User");
    await page.locator('#contact input[name="phone"]').fill("03001234567");
    await page.locator('#contact input[name="address"]').fill("Gulberg, Lahore");
    await submit.click();
    await page.waitForTimeout(800);
    const success =
      (await page.locator('[data-testid="contact-success"]').count()) > 0;
    if (!success) {
      findings.push({
        severity: "major",
        area: "contact-form",
        message: "Valid submit did not show success state",
      });
    }
    await page.screenshot({
      path: path.join(shotDir, "contact-success.png"),
      fullPage: false,
    });
  } else {
    findings.push({
      severity: "critical",
      area: "contact-form",
      message: "Submit button missing",
    });
  }

  // Anchor navigation
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  if (viewport.width >= 1024) {
    await page.locator('header a:text-is("Products")').click();
    await page.waitForTimeout(800);
    const productsTop = await page.evaluate(() => {
      const el = document.getElementById("products");
      if (!el) return null;
      return el.getBoundingClientRect().top;
    });
    if (productsTop === null || productsTop > 200 || productsTop < -100) {
      findings.push({
        severity: "minor",
        area: "nav-scroll",
        message: `Products anchor land position top=${productsTop}`,
      });
    }
  }

  // WhatsApp FAB
  const fab = page.locator('a[aria-label*="WhatsApp"]');
  if ((await fab.count()) === 0) {
    findings.push({
      severity: "major",
      area: "fab",
      message: "WhatsApp FAB missing",
    });
  }

  // Accessibility-ish: buttons/links have accessible names
  const unnamed = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll("button, a").forEach((el, i) => {
      const text = (el.textContent || "").trim();
      const aria = el.getAttribute("aria-label") || "";
      if (!text && !aria) bad.push(`${el.tagName}#${i}`);
    });
    return bad.slice(0, 10);
  });
  if (unnamed.length) {
    findings.push({
      severity: "minor",
      area: "a11y",
      message: `Controls without accessible name: ${unnamed.join(", ")}`,
    });
  }

  // Layout metrics for hero
  const heroMetrics = await page.evaluate(() => {
    const h1 = document.querySelector("#top h1");
    const chips = document.querySelectorAll("#top .rounded-full.border");
    const rect = h1?.getBoundingClientRect();
    return {
      h1FontSize: h1 ? getComputedStyle(h1).fontSize : null,
      h1Lines: h1 ? h1.innerText.split("\n").filter(Boolean).length : 0,
      h1Width: rect?.width ?? 0,
      chipCount: chips.length,
      viewportH: window.innerHeight,
    };
  });
  if (viewport.width >= 1024 && heroMetrics.h1Lines > 3) {
    findings.push({
      severity: "major",
      area: "hero-type",
      message: `Hero H1 wraps to ${heroMetrics.h1Lines} lines (want 3)`,
      detail: heroMetrics,
    });
  }

  // Product cards visible
  await page.locator("#products").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollBy(0, 280));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(shotDir, "products-cards.png"),
    fullPage: false,
  });
  const productCards = await page.locator("[data-testid^=product-card-]").count();
  if (productCards < 3) {
    findings.push({
      severity: "major",
      area: "products",
      message: `Expected 3 product cards, found ${productCards}`,
    });
  }

  // Broken images in viewport only (lazy offscreen images may still be width 0)
  const brokenImages = await page.evaluate(() => {
    const bad = [];
    for (const img of document.querySelectorAll("img")) {
      const rect = img.getBoundingClientRect();
      const inView =
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < window.innerWidth;
      if (!inView) continue;
      if (img.complete && img.naturalWidth === 0 && img.src) {
        bad.push(img.currentSrc || img.src);
      }
    }
    return bad.slice(0, 8);
  });
  if (brokenImages.length) {
    findings.push({
      severity: "major",
      area: "images",
      message: `Broken/empty images: ${brokenImages.map((u) => u.slice(0, 100)).join(" || ")}`,
    });
  }

  // About statement has real spaces
  const aboutText = (await page.locator("#about h2").innerText()).replace(
    /\u00A0/g,
    " ",
  );
  if (!/Milk should be simple/.test(aboutText)) {
    findings.push({
      severity: "major",
      area: "about",
      message: `About statement spacing broken: "${aboutText.slice(0, 80)}"`,
    });
  }

  if (consoleErrors.length) {
    const real = consoleErrors.filter(
      (e) =>
        !e.includes("hydrated but some attributes") &&
        !e.includes("Download the React DevTools") &&
        !e.includes("Failed to load resource"),
    );
    if (real.length) {
      findings.push({
        severity: "major",
        area: "console",
        message: `Console errors: ${real.slice(0, 3).join(" | ").slice(0, 400)}`,
      });
    }
  }
  if (pageErrors.length) {
    findings.push({
      severity: "critical",
      area: "pageerror",
      message: `Page errors: ${pageErrors.join(" | ")}`,
    });
  }

  await context.close();
  return { label, viewport, findings, heroMetrics, consoleErrors, pageErrors };
}

async function main() {
  ensureDir(OUT);
  const browser = await chromium.launch();
  const results = [];

  results.push(
    await auditViewport(browser, "desktop", { width: 1440, height: 900 }),
  );
  results.push(
    await auditViewport(browser, "tablet", { width: 768, height: 1024 }),
  );
  results.push(
    await auditViewport(browser, "mobile", { width: 390, height: 844 }),
  );

  await browser.close();

  const report = {
    base: BASE,
    at: new Date().toISOString(),
    results,
    summary: {
      critical: results.flatMap((r) => r.findings.filter((f) => f.severity === "critical")),
      major: results.flatMap((r) => r.findings.filter((f) => f.severity === "major")),
      minor: results.flatMap((r) => r.findings.filter((f) => f.severity === "minor")),
    },
  };

  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));

  console.log("\n=== AUDIT SUMMARY ===");
  console.log(`Critical: ${report.summary.critical.length}`);
  console.log(`Major:    ${report.summary.major.length}`);
  console.log(`Minor:    ${report.summary.minor.length}`);
  for (const r of results) {
    console.log(`\n[${r.label}] findings: ${r.findings.length}`);
    for (const f of r.findings) {
      console.log(`  - (${f.severity}) [${f.area}] ${f.message}`);
    }
  }
  console.log(`\nReport: ${path.join(OUT, "report.json")}`);
  process.exit(report.summary.critical.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
