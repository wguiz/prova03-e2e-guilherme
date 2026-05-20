import { test, expect } from '@playwright/test';

test('checkbox can be selected and unselected', async ({ page }) => {
  await page.goto('/checkboxes');

  const checkboxes = page.locator('#checkboxes input');

  // First checkbox is initially unchecked
  await expect(checkboxes.first()).not.toBeChecked();

  // Click to check it
  await checkboxes.first().check();
  await expect(checkboxes.first()).toBeChecked();

  // Toggle back
  await checkboxes.first().uncheck();
  await expect(checkboxes.first()).not.toBeChecked();
});