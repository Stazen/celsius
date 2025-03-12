import { expect, test } from "@playwright/test";

test("Verify Landing Page", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1").first()).toContainText(
    "Monitorez vos locaux avec Celsius",
  );

  await expect(page.locator("nav")).toHaveCount(1);
  await expect(page.locator("nav ul li")).toHaveCount(5);

  await expect(page.locator("nav ul li").first()).toContainText("Preview");
  await expect(page.locator("nav ul li").nth(1)).toContainText("Clients");
  await expect(page.locator("nav ul li").nth(2)).toContainText("Features");
  await expect(page.locator("nav ul li").nth(3)).toContainText("Tarifs");
  await expect(page.locator("nav ul li").last()).toContainText("Questions");

  await expect(page.locator("header div div a").first()).toContainText(
    "Connexion",
  );
  await expect(page.locator("header div div a").nth(1)).toContainText(
    "Inscription",
  );

  const tarifsSection = await page.getByTestId("Tarifs");
  await expect(tarifsSection).not.toBeNull();
  const tarifDetails = await page.getByTestId("Tarifs-Details");
  await expect(tarifDetails).not.toBeNull();
});
