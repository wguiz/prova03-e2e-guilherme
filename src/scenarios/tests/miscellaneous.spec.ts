// src/scenarios/tests/the-internet.spec.ts

import { test, expect } from '@playwright/test';

test.describe('The Internet', () => {

  test('add/remove elements', async ({ page }) => {
    await page.goto('/add_remove_elements/');

    await page.getByRole('button', { name: 'Add Element' }).click();

    const deleteButton = page.getByRole('button', { name: 'Delete' });

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(deleteButton).toHaveCount(0);
  });

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

});