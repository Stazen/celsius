import { expect, test } from "@playwright/test";

test("Check for home nav", async ({ page }) => {
  await page.goto("/home");
  await expect(page).toHaveURL(/\/home/);

  await expect(page.getByText("Timothée Doudon")).toBeVisible();
  await expect(page.getByText("doudon_t@etna-alternance.net")).toBeVisible();

  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();

  await expect(page.getByRole("link", { name: "Paramètres" })).toBeVisible();
  page.getByRole("link", { name: "Paramètres" }).click();
  await expect(page).toHaveURL(/\/home\/settings/);
  await page.goto("/home");

  await expect(page.getByRole("link", { name: "Données" })).toBeVisible();
  await page.getByRole("link", { name: "Données" }).click();
  await expect(page).toHaveURL(/\/home\/data-details/);

  await page.goto("/home");
});

test("Check for home Sections", async ({ page }) => {
  await page.goto("/home");
  await expect(page).toHaveURL(/\/home/);

  await expect(page.getByText("Récapitulatif de la semaine")).toBeVisible();

  const incidentsDescription = await page.locator('p:has-text("Nombre d\'incidents moyen par jour")');
  await expect(incidentsDescription).toBeVisible();

  const temperatureDescription = await page.locator('p:has-text("Température moyenne dans vos locaux")');
  await expect(temperatureDescription).toBeVisible();

  const timeRangeDescription = await page.locator('p:has-text("Plage horaire avec le plus d\'incidents détectés")');
  await expect(timeRangeDescription).toBeVisible();

  const roomDescription = await page.locator('p:has-text("Pièce dans laquelle le plus d\'incidents ont été détectés")');
  await expect(roomDescription).toBeVisible();

  const presenceRateDescription = await page.locator('p:has-text("Taux de présence dans vos locaux")');
  await expect(presenceRateDescription).toBeVisible();

  await expect(page.getByText("Liste de vos installations")).toBeVisible();

  const chevronButton = page.locator("button").first();

  await expect(chevronButton).toBeVisible();

  const presenceEtage = page.locator('div:has-text("Etage")').first();
  await page.waitForTimeout(2000);

  await chevronButton.click();

  await presenceEtage.waitFor({ state: 'visible' });
  await expect(presenceEtage).toBeVisible();

  const currentMonth = new Date().toLocaleString("fr", {
      month: "long",
  });

  const monthText =
      currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  await expect(page.getByText(monthText)).toBeVisible();
  //await expect(page.getByText("Mars")).toBeVisible();
  await expect(page.getByText("Logs")).toBeVisible();
});
