import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';


test('Verify user can add product to cart', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkOutPage = new CheckoutPage(page);
  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';
  const cartQuantity = '1';
  const productQuantity = '1'

  await homePage.open();
  await homePage.clickProduct(productName);

  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText(productName);
  await expect(productPage.unitPrice).toHaveText(productPrice);
  await productPage.addToCartButton.click();
  await expect(productPage.toast).toBeVisible();
  await expect(productPage.toast).toContainText('Product added to shopping cart');
  await expect(productPage.toast).toBeHidden({ timeout: 8000 });
  await expect(productPage.cartQuantity).toHaveText(cartQuantity);

  await productPage.header.cartButton.click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(checkOutPage.productQuantity).toHaveValue(productQuantity);
  await expect(checkOutPage.productTitle).toHaveText(productName);
  await expect(checkOutPage.proceedToCheckoutButton).toBeVisible();
});