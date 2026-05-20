import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('successful login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('tomsmith', 'SuperSecretPassword!');

  await expect(login.getFlashMessage())
    .toContainText('You logged into a secure area!');
});