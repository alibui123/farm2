import { chromium } from "playwright";

const b = await chromium.launch();
const page = await b.newPage();
const issues = [];
page.on("pageerror", (e) => issues.push("PAGE: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") issues.push("CON: " + m.text().slice(0, 220));
});

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3002", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const h1 = await page.locator("#top h1").innerText();
const freeSampleVisible = await page
  .locator('header a:text-is("Free Sample")')
  .isVisible();
const nextIssue = await page.locator("text=1 Issue").count();

console.log("H1:", JSON.stringify(h1));
console.log("Free Sample visible desktop:", freeSampleVisible);
console.log("Next issue badge count:", nextIssue);
console.log("Issues:", issues);

await page.screenshot({
  path: "D:/farm2/.impeccable/audit/desktop/00-hero-fixed.png",
});

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(600);
const fsMobile = await page
  .locator('header a:text-is("Free Sample")')
  .isVisible()
  .catch(() => false);
console.log("Free Sample visible mobile:", fsMobile);
await page.screenshot({
  path: "D:/farm2/.impeccable/audit/mobile/00-hero-fixed.png",
});

await b.close();
