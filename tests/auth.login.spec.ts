import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import path from 'path';

export const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const ACCOUNT_NAME = 'Jane Doe';
const EMAIL = 'customer@practicesoftwaretesting.com';
const PASSWORD = 'welcome01';

test('Verify login with valid credentials', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  
  await loginPage.goToLoginPage();

  await loginPage.performLogin(EMAIL, PASSWORD);
  
  await expect(page).toHaveURL('/account');
  await expect(accountPage.getPageTitle()).toHaveText('My account');
  await expect(accountPage.getAccountName()).toHaveText(ACCOUNT_NAME);

  await page.context().storageState({ path: authFile });
});