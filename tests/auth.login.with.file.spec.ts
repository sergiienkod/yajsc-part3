import { test, expect } from '@playwright/test';
import { authFilePath } from '../pages/authFilePath';

test.use({ storageState: process.env.CI ? undefined : authFilePath });

test('C106 Verify login with valid credentials', { tag: '@regression' }, async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  await page.goto('/account');
  
  await expect(page).toHaveURL('/account');
  
});
