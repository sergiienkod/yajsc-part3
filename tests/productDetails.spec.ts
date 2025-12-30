import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';


test('Verify user can view product details', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const productName = 'Combination Pliers';
  const productPrice = '14.15'

  await homePage.open();
  await homePage.clickProduct(productName);

  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText(productName);
  await expect(productPage.unitPrice).toHaveText(productPrice);
  await expect(productPage.addToCart).toBeVisible();
  await expect(productPage.addToFavorites).toBeVisible();
});