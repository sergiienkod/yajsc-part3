import { expect, test } from '../fixtures/loggedInApp.fixtures';

const ACCOUNT_NAME = 'Jane Doe';

test('C109 Verify login with valid credentials, using fixtures', { tag: '@regression' }, async ({ loggedInApp }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
    
  await expect(loggedInApp.page).toHaveURL('/account');
  await expect(loggedInApp.accountPage.getPageTitle()).toHaveText('My account');
  await expect(loggedInApp.accountPage.getAccountName()).toHaveText(ACCOUNT_NAME);
});