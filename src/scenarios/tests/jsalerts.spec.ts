import { test, expect } from '@playwright/test';

test('javascript alert accept', async ({ page }) => {
await page.goto('/javascript_alerts');

page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
});

await page.getByRole('button', {
    name: 'Click for JS Alert',
}).click();

await expect(page.locator('#result'))
    .toHaveText('You successfully clicked an alert');
});

test('javascript confirm dismiss', async ({ page }) => {
await page.goto('/javascript_alerts');

page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss();
});

await page.getByRole('button', {
    name: 'Click for JS Confirm',
}).click();

await expect(page.locator('#result'))
    .toHaveText('You clicked: Cancel');
});

test('javascript prompt', async ({ page }) => {
await page.goto('/javascript_alerts');

page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');

    await dialog.accept('playwright');
});

await page.getByRole('button', {
    name: 'Click for JS Prompt',
}).click();

await expect(page.locator('#result'))
    .toHaveText('You entered: playwright');
});