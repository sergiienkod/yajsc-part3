import { expect, test } from '../app.fixtures';


test('Verify user can view product details', async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const productName = 'Combination Pliers';
  const productPrice = '14.15'

  await allPages.homePage.open();
  await allPages.homePage.clickProduct(productName);

  await expect(page).toHaveURL(/\/product/);
  await expect(allPages.productPage.productName).toHaveText(productName);
  await expect(allPages.productPage.unitPrice).toHaveText(productPrice);
  await expect(allPages.productPage.addToCart).toBeVisible();
  await expect(allPages.productPage.addToFavorites).toBeVisible();
});