import { test, expect } from '@playwright/test';

test('checkbox can be selected and unselected', async ({ page }) => {
  await page.goto('/checkboxes');

  const checkboxes = page.locator('#checkboxes input');

  await expect(checkboxes.first()).not.toBeChecked();


  await checkboxes.first().check();
  await expect(checkboxes.first()).toBeChecked();

  await checkboxes.first().uncheck();
  await expect(checkboxes.first()).not.toBeChecked();
});