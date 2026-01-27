import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

const ACCOUNT_NAME = 'Jane Doe';
const EMAIL = 'customer@practicesoftwaretesting.com';
const PASSWORD = 'welcome01';

test('C110 Verify login with valid credentials', { tag: '@smoke' }, async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  
  await test.step('Go to Login page', async () => {
    await loginPage.goToLoginPage();
    //await page.goto('/auth/login');
  });

  await test.step('Perform log in', async () => {
    await loginPage.performLogin(EMAIL, PASSWORD);
    //await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
    //await page.getByTestId('password').fill('welcome01');
    //await page.getByTestId('login-submit').click();
  });

  await test.step('Verify Account details', async () => {
    //await accountPage.verifyAccountPage('Jane Doe');
    await expect(page).toHaveURL('/account');
    await expect(accountPage.getPageTitle()).toHaveText('My account');
    await expect(accountPage.getAccountName()).toHaveText(ACCOUNT_NAME);
  });

});