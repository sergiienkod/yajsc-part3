import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

const ACCOUNT_NAME = 'Jane Doe';
const EMAIL = 'customer@practicesoftwaretesting.com';
const PASSWORD = 'welcome01';

test('Verify login with valid credentials', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  
  await loginPage.goToLoginPage();
  //await page.goto('/auth/login');

  await loginPage.performLogin(EMAIL, PASSWORD);
  //await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  //await page.getByTestId('password').fill('welcome01');
  //await page.getByTestId('login-submit').click();

  //await accountPage.verifyAccountPage('Jane Doe');
  await expect(page).toHaveURL('/account');
  await expect(accountPage.getPageTitle()).toHaveText('My account');
  await expect(accountPage.getAccountName()).toHaveText(ACCOUNT_NAME);
});