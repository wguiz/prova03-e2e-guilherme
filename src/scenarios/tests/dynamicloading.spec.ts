import { test, expect } from '@playwright/test';

test('dynamic loading', async ({ page }) => {
await page.goto('/dynamic_loading/1');

await page.getByRole('button', {
    name: 'Start',
}).click();

await expect(page.locator('#loading'))
    .toBeHidden();

await expect(page.locator('#finish'))
    .toContainText('Hello World!');
});