import { expect, test } from "@playwright/test";

test("Check for settings nav", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);

  await expect(page.locator("h4").first()).toContainText("Timothée Doudon");
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

  await expect(page.getByText("Gérez vos installations")).toBeVisible();
  await expect(page.locator("p").nth(1)).toContainText("Ecole");

  await expect(page.getByText("Gérez votre équipe")).toBeVisible();
  const element = page.locator('p').filter({ hasText: 'Timothée Doudon' });
  await expect(element).toBeVisible();

  await expect(page.getByText("Ajouter un building")).toBeVisible();
  await expect(page.getByText("Ajouter un étage")).toBeVisible();
  await expect(page.getByText("Ajouter une pièce")).toBeVisible();
  await expect(page.getByText("Ajouter un utilisateur")).toBeVisible();
});

// Add Users
test("Add Users admin & user", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);
  const roleSelect = page.locator("#role-select");
  const userButton = page.locator('button:has-text("Ajouter")').nth(3);

  await page.click('text=Ajouter un utilisateur');
  await page.fill('input[placeholder="Nom d\'utilisateur"]', 'Test-front-user');
  await page.fill('input[placeholder="Adresse e-mail"]', 'test@gmail.com');
  await page.fill('input[placeholder="Mot de passe"]', 'test12345');
  await roleSelect.click();
  await roleSelect.selectOption({ index: 1 });
  await userButton.click();
  await expect(page.getByText("L'utilisateur a été créé avec succès.")).toBeVisible();

  await page.click('text=Ajouter un utilisateur');
  await page.fill('input[placeholder="Nom d\'utilisateur"]', 'Test-front-admin');
  await page.fill('input[placeholder="Adresse e-mail"]', 'test1@gmail.com');
  await page.fill('input[placeholder="Mot de passe"]', 'test12345');
  await roleSelect.click();
  await roleSelect.selectOption({ index: 0 });
  await userButton.click();
  await expect(page.getByText("L'utilisateur a été créé avec succès.")).toBeVisible();
});

// Update Users
test("Update Users", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);

  await page.click('text=Test-front-user');
  await page.fill('input[name="name"]', 'Test-front-user-updated');
  await page.click('button:has-text("Enregistrer")');
  await expect(page.getByText("L'utilisateur a été modifié avec succès.")).toBeVisible();

  await page.click('text=Test-front-admin');
  await page.fill('input[name="name"]', 'Test-front-admin-updated');
  await page.click('button:has-text("Enregistrer")');
  await expect(page.getByText("L'utilisateur a été modifié avec succès.")).toBeVisible();
});

// Delete Users
test("Delete Users", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);

  await page.click('#delete-user-Test-front-user-updated');
  await expect(page.getByText("L'utilisateur a été supprimé avec succès.")).toBeVisible();

  await page.click('#delete-user-Test-front-admin-updated');
  await expect(page.getByText("L'utilisateur a été supprimé avec succès.")).toBeVisible();
}
);

// Add building, floor & room
test("Add building, floor, room", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);

  await page.click('text=Ajouter un building');
  await page.fill('input[placeholder="Nom"]', 'Test front building');
  await page.fill('input[placeholder="Adresse"]', '123 Rue Exemple');
  await page.fill('input[placeholder="Code postal"]', '75001');
  await page.fill('input[placeholder="Ville"]', 'Paris');
  await page.fill('input[placeholder="Pays"]', 'France');
  await page.click('button:has-text("Ajouter")');
  await expect(page.getByText("Le building a été créé avec succès.")).toBeVisible();

  await page.click('text=Ajouter un étage');
  const buildingId = await page.$$eval('option', (options, text) => {
    const option = options.find(option => option.textContent === text);
    return option ? option.value : null;
  }, "Test front building");
  if (buildingId) {
    await page.selectOption('select', { value: buildingId });
  }
  await page.fill('input[placeholder="Numéro de l\'étage"]', '9999');
  const floorButton = page.locator('button:has-text("Ajouter")').nth(1);
  await floorButton.click();
  await expect(page.getByText("L\'étage à bien été créé.")).toBeVisible();

  await page.click('text=Ajouter un étage');
  await page.click('text=Ajouter une pièce');
  const buildingSelect = page.locator("#building-select");
  await buildingSelect.click();
  await buildingSelect.selectOption({ index: 2 });
  await page.waitForTimeout(1000);
  const floorSelect = page.locator("#floor-select");
  await floorSelect.click();
  await floorSelect.selectOption({ index: 1 });
  await page.fill('input[placeholder="Nom de la pièce"]', 'Test front room');
  const roomButton = page.locator('button:has-text("Ajouter")').nth(2);
  await roomButton.click();
  await expect(page.getByText("La pièce à bien été créé.")).toBeVisible();
});

// Update building, floor & room
test("Update building, floor & room", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);

  const buildingNameElement = await page.locator('p#name-building', { hasText: 'Test front building' });
  await expect(buildingNameElement).toBeVisible();
  const parentElement = buildingNameElement.locator('../..');
  const updateButton = parentElement.locator('#update-building');
  await expect(updateButton).toBeVisible();
  await updateButton.click();

  await page.fill('input[name="name"]', 'Test front building updated');
  await page.fill('input[name="address"]', '123 Rue Exemple updated');
  await page.fill('input[name="city"]', 'Paris updated');
  await page.fill('input[name="postalCode"]', '75003');
  await page.fill('input[name="country"]', 'France updated');
  await page.click('button:has-text("Enregistrer")');
  await expect(page.getByText("Le bâtiment a été modifié avec succès.")).toBeVisible();

  const chevronButton = parentElement.locator('button#expand-building');
  await expect(chevronButton).toBeVisible();
  await chevronButton.click();
  const floorNameElement = await page.locator('p#number-floor', { hasText: 'Etage 9999' });
  await expect(floorNameElement).toBeVisible();
  const parentElementFloor = floorNameElement.locator('../..');
  const updateButtonFloor = parentElementFloor.locator('#edit-floor');
  await expect(updateButtonFloor).toBeVisible();
  await updateButtonFloor.click();
  await page.fill('input[name="number"]', '2');
  await page.click('button:has-text("Enregistrer")');
  await expect(page.getByText("L\'étage a été modifié avec succès.")).toBeVisible();

  const floorNameElement2 = await page.locator('p#number-floor', { hasText: 'Etage 2' });
  const parentElementFloor2 = floorNameElement2.locator('../..');
  const chevronButtonRoom = parentElementFloor2.locator('#expand-floor');
  await expect(chevronButtonRoom).toBeVisible();
  await chevronButtonRoom.click();
  const roomNameElement = await page.locator('p#name-room', { hasText: 'Test front room' });
  await expect(roomNameElement).toBeVisible();
  const parentElementRoom = roomNameElement.locator('../..');
  const updateButtonRoom = parentElementRoom.locator('#edit-room');
  await expect(updateButtonRoom).toBeVisible();
  await updateButtonRoom.click();
  await page.fill('input[name="name"]', 'Test front room updated');
  await page.click('button:has-text("Enregistrer")');
  await expect(page.getByText("La pièce a été modifié avec succès.")).toBeVisible();
});

test("Delete building, floor & room", async ({ page }) => {
  await page.goto("/home/settings");
  await expect(page).toHaveURL(/\/home\/settings/);

  const chevronLocatorBuilding = await page.locator('p#name-building', { hasText: 'Test front building' });
  await expect(chevronLocatorBuilding).toBeVisible();
  const parentElementBuilding = chevronLocatorBuilding.locator('../..');
  const chevronButton = parentElementBuilding.locator('button#expand-building');
  await expect(chevronButton).toBeVisible();
  await chevronButton.click();

  const floorNameElement2 = await page.locator('p#number-floor', { hasText: 'Etage 2' });
  await expect(floorNameElement2).toBeVisible();
  const parentElementFloor2 = floorNameElement2.locator('../..');
  const chevronButtonRoom = parentElementFloor2.locator('#expand-floor');
  await expect(chevronButtonRoom).toBeVisible();
  await chevronButtonRoom.click();

  //delete room
  const roomNameElement = await page.locator('p#name-room', { hasText: 'Test front room updated' });
  await expect(roomNameElement).toBeVisible();
  const parentElementRoom = roomNameElement.locator('../..');
  const deleteButtonRoom = parentElementRoom.locator('#delete-room');
  await deleteButtonRoom.click();
  await expect(page.getByText("La pièce a été supprimé avec succès.")).toBeVisible();

  //delete floor
  const floorNameElement = await page.locator('p#number-floor', { hasText: 'Etage 2' });
  await expect(floorNameElement).toBeVisible();
  const parentElementFloor = floorNameElement.locator('../..');
  const deleteButtonFloor = parentElementFloor.locator('#delete-floor');
  await deleteButtonFloor.click();
  await expect(page.getByText("L'étage a été supprimé avec succès.")).toBeVisible();

  //delete building
  const buildingNameElement = await page.locator('p#name-building', { hasText: 'Test front building updated' });
  await expect(buildingNameElement).toBeVisible();
  const parentElement = buildingNameElement.locator('../..');
  const deleteButton = parentElement.locator('#delete-building');
  await deleteButton.click();
  await expect(page.getByText("Le bâtiment a été supprimé avec succès.")).toBeVisible();
});