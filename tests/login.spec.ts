import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { USER } from '../config/baseConfig';

test('C110 Verify login with valid credentials', { tag: '@smoke' }, async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  
  await test.step('Go to Login page', async () => {
    await loginPage.goToLoginPage();
  });

  await test.step('Perform log in', async () => {
    await loginPage.performLogin(USER.email, USER.password);
  });

  await test.step('Verify Account details', async () => {
    await expect(page).toHaveURL('/account');
    await expect(accountPage.getPageTitle()).toHaveText('My account');
    await expect(accountPage.getAccountName()).toHaveText(USER.fullName);
  });

});