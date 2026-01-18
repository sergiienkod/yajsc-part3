import { expect, test } from './app.fixtures';


test('Verify user can view product details', async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const product = {
    name : 'Combination Pliers',
    price : '14.15',
  };
  
  await allPages.homePage.open();
  await allPages.homePage.clickProduct(product.name);
  await expect(page).toHaveURL(/\/product/);
  await expect(allPages.productPage.productName).toHaveText(product.name);
  await expect(allPages.productPage.unitPrice).toHaveText(product.price);
  await expect(allPages.productPage.addToCartButton).toBeVisible();
  await expect(allPages.productPage.addToFavorites).toBeVisible();
});