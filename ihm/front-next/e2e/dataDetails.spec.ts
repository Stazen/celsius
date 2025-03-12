import { expect, test } from "@playwright/test";

test("Check for data details nav", async ({ page }) => {
    await page.goto("/home/data-details");
    await expect(page).toHaveURL(/\/home\/data-details/);

    await expect(page.getByText("Timothée Doudon")).toBeVisible();
    await expect(page.getByText("doudon_t@etna-alternance.net")).toBeVisible();

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/\/home/);

    await page.goto("/home/settings");

    await expect(page.getByRole("link", { name: "Données" })).toBeVisible();
    await page.getByRole("link", { name: "Données" }).click();
    await expect(page).toHaveURL(/\/home\/data-details/);

    await page.goto("/home/settings");
    await expect(page).toHaveURL(/\/home\/settings/);
});

test("Check for data details Sections", async ({ page }) => {
    await page.goto("/home/data-details");
    await expect(page).toHaveURL(/\/home\/data-details/);

    const batimentButton = page.locator("#building");
    await expect(batimentButton).toBeVisible();

    await batimentButton.click();

    await page.waitForTimeout(2000);
    
    const optionsBuilding = await page.$$eval('#building > option', (els) => {
        return els.map(option => option.textContent)
    })

    const batimentOptionsCount = optionsBuilding.length;
    expect(batimentOptionsCount).toBeGreaterThan(0);

    await batimentButton.selectOption({ index: 0 });

    const pieceButton = page.locator("#sensor");
    await expect(pieceButton).toBeVisible();

    await pieceButton.click();

    const optionsPiece = await page.$$eval('#sensor > option', (els) => {
        return els.map(option => option.textContent)
    })

    const pieceOptionsCount = optionsPiece.length;
    expect(pieceOptionsCount).toBeGreaterThan(0);

    await pieceButton.selectOption({ index: 0 });

    const intervalleButton = page.locator("#temporality");
    await expect(intervalleButton).toBeVisible();

    await intervalleButton.click();

    const optionsIntervalle = await page.$$eval('#temporality > option', (els) => {
        return els.map(option => option.textContent)
    })

    const intervalleOptionsCount = await optionsIntervalle.length;
    expect(intervalleOptionsCount).toBeGreaterThan(0);

    await intervalleButton.selectOption({ index: 1 });

    const currentMonth = new Date().toLocaleString("fr", {
        month: "long",
    });

    const monthText =
        currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
    await expect(page.getByText(monthText)).toBeVisible();
    //await expect(page.getByText("Mars")).toBeVisible();
    await expect(page.getByText("Logs")).toBeVisible();
});