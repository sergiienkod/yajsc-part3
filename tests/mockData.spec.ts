import { test, expect } from '../fixtures/app.fixtures';
import { generateFakeProducts } from '../testData/mockProducts';

test('User sees 20 products when products API is mocked', async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');

  const products = generateFakeProducts(20);

  await page.route('**/products*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        current_page: 1,
        data: products,
        from: 1,
        last_page: 1,
        per_page: 20,
        to: 20,
        total: 20,
      }),
    });
  });

  await allPages.homePage.open();
  await allPages.homePage.productCards.first().waitFor({ state: 'visible' });

  expect(await allPages.homePage.productCards.count()).toBe(20);
});
