import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:2368/ghost/');
    await page.getByPlaceholder('jamie@example.com').fill('a.reyna@uniandes.edu.co');
    await page.getByPlaceholder('•••••••••••••••').fill('Naranjo248.');
    await page.locator('id=ember10').click();
    await page.goto('http://localhost:2368/ghost/#/posts');
});

test('No debes ser capaz de dejar vacio el autor de un post', async ({ page }) => {
    await page.click('[class="ember-view gh-post-list-cta edit "]');
    await page.click('[title=Settings]');
    await page.click('[aria-label="remove element"]');
    await expect(page.getByText('At least one author is required')).toBeTruthy();
});