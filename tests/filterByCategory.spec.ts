import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Category } from '../pages/enums';

test('Filter products by category Sander', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
    const homePage = new HomePage(page);

    await homePage.open();

    await homePage.selectCategory(Category.SANDER);

    const firstSanderProduct = homePage.page.locator('.card >> text=Sander').first();
    await firstSanderProduct.waitFor({ state: 'visible' });

    const titles = await homePage.getVisibleProductTitles();

    titles.forEach(title => expect(title).toContain('Sander'));
});