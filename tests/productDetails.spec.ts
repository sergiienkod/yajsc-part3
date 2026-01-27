import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';


test('C113 Verify user can view product details', { tag: '@smoke' }, async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const productName = 'Combination Pliers';
  const productPrice = '14.15'

  await test.step('Open homepage', async () => {
    await homePage.open();   
  });
  
  await test.step('Click on the product', async () => {
    await homePage.clickProduct(productName);
  });

  await test.step('Verify product details', async () => {
    await expect(page).toHaveURL(/\/product/);
    await expect(productPage.productName).toHaveText(productName);
    await expect(productPage.unitPrice).toHaveText(productPrice);
  });

  await test.step('Verify buttons visibility', async () => {
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavorites).toBeVisible();
  });
});