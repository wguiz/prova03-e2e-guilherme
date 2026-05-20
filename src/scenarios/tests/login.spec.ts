import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('invalid login shows error', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('wronguser', 'wrongpass');

  await expect(login.getFlashMessage())
    .toContainText('Your username is invalid!');
});