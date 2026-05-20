import { test, expect } from '@playwright/test';

test('file upload', async ({ page }) => {
await page.goto('/upload');

await page.locator('#file-upload').setInputFiles({
    name: 'sample.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('playwright upload'),
});

await page.getByRole('button', {
    name: 'Upload',
}).click();

await expect(page.locator('#uploaded-files'))
    .toHaveText('sample.txt');
});

test('multiple windows', async ({ page, context }) => {
await page.goto('/windows');

const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Click Here').click(),
]);

await newPage.waitForLoadState();

await expect(
    newPage.getByRole('heading', {
    name: 'New Window',
    }),
).toBeVisible();
});