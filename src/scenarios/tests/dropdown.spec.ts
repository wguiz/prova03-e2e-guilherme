import { test, expect } from '@playwright/test';

test('dropdown selection works', async ({ page }) => {
  await page.goto('/dropdown');

  const dropdown = page.locator('#dropdown');

  // Select option 1
  await dropdown.selectOption('1');
  await expect(dropdown).toHaveValue('1');

  // Select option 2
  await dropdown.selectOption('2');
  await expect(dropdown).toHaveValue('2');
});