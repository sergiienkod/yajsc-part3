import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use(process.env.CI ? {} : { storageState: authFile });

test('Verify login with valid credentials', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  await page.goto('/account');
  
  await expect(page).toHaveURL('/account');
  
});