import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

const PRODUCT_NAME = 'Combination Pliers';
const PRODUCT_PRICE = '14.15'

test('Verify user can view product details', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.clickProduct(PRODUCT_NAME);

  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText(PRODUCT_NAME);
  await expect(productPage.unitPrice).toHaveText(PRODUCT_PRICE);
  await expect(productPage.addToCart).toBeVisible();
  await expect(productPage.addToFavorites).toBeVisible();
});