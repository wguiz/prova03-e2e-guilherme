import { test, expect } from '@playwright/test';

test('inputs field', async ({ page }) => {
await page.goto('/inputs');

const input = page.locator('input');

await input.fill('5');

await input.press('ArrowUp');

await expect(input).toHaveValue('6');

await input.press('ArrowDown');

await expect(input).toHaveValue('5');
});

test('infinite scroll', async ({ page }) => {
await page.goto('/infinite_scroll');

for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 2500);
}

await expect(page.locator('.jscroll-added'))
    .toHaveCount(4);
});

test('drag and drop', async ({ page }) => {
await page.goto('/drag_and_drop');

const source = page.locator('#column-a');
const target = page.locator('#column-b');

await source.dragTo(target);

await expect(page.locator('#column-a header'))
    .toHaveText('B');

await expect(page.locator('#column-b header'))
    .toHaveText('A');
});

