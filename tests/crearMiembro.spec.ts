import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:2368/ghost/');
    await page.getByPlaceholder('jamie@example.com').fill('a.reyna@uniandes.edu.co');
    await page.getByPlaceholder('•••••••••••••••').fill('Naranjo248.');
    await page.locator('id=ember10').click();
    await page.goto('http://localhost:2368/ghost/#/members');
});

test('No debes ser capaz de crear un miembro sin email', async ({ page }) => {
  await page.click('text=New member');
  await page.locator('id=member-name').fill('Usuario');
  await page.click('text=Save');
  await page.goto('http://localhost:2368/ghost/#/members');
  await page.getByText(/Leave/).click();
  await expect(page.getByText('usuario@uniandes.edu.co')).toBeFalsy;
});

test('Debes ser capaz de crear un miembro sin nombre', async ({ page }) => {
  await page.click('text=New member');
  await page.locator('id=member-email').fill('usuario2@uniandes.edu.co');
  await page.click('text=Save');
  await page.goto('http://localhost:2368/ghost/#/members');
  await expect(page.getByText('usuario@uniandes.edu.co')).toBeTruthy();
});

test('No debes ser capaz de crear un miembro con email repetido', async ({ page }) => {
  await page.click('text=New member');
  await page.locator('id=member-email').fill('usuario2@uniandes.edu.co');
  await page.click('text=Save');
  await page.goto('http://localhost:2368/ghost/#/members');
  await expect(page.getByText('usuario2@uniandes.edu.co')).toBeTruthy();
});

test('Debes ser capaz de crear un miembro con nombre y email', async ({ page }) => {
  await page.click('text=New member');
  await page.locator('id=member-name').fill('Usuario');
  await page.locator('id=member-email').fill('usuario@uniandes.edu.co');
  await page.click('text=Save');
  await page.goto('http://localhost:2368/ghost/#/members');
  await expect(page.getByText('usuario@uniandes.edu.co')).toBeTruthy();
});
/*
test.afterEach(async ({ page }) => {
  // Runs after each test and signs in each page.
  await page.goto('http://localhost:2368/ghost/#/members');
  await page.getByText('usuario@uniandes.edu.co').click();
});
*/