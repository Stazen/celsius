import { expect, test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("/signin");
  await page.getByPlaceholder("Email").fill("doudon_t@etna-alternance.net");
  await page.getByPlaceholder("Mot de passe").fill("test12345");
  await page.getByRole("button", { name: "Se connecter" }).click();

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page).toHaveURL(/\/home/);

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
