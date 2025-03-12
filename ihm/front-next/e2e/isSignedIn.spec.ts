import { expect, test } from "@playwright/test";

test("Check for Signin", async ({ page }) => {
  await page.goto("/home");
  await await expect(page).toHaveURL(/\/home/);
});
