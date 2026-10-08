import fs from "node:fs";
import path from "node:path";

import { chromium } from "@playwright/test";

async function globalSetup(): Promise<void> {
  const authDir = path.resolve("playwright/.auth");
  fs.mkdirSync(authDir, { recursive: true });

  const channel = process.env.PW_CHANNEL ?? "chrome";
  const browser = await chromium.launch({ channel, headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.saucedemo.com/");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.waitForURL(/inventory\.html/);
  await page
    .context()
    .storageState({ path: path.join(authDir, "standard_user.json") });

  await browser.close();
}

export default globalSetup;
