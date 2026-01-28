import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';

test('C104 Verify user can add product to cart', { tag: '@smoke' }, async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkOutPage = new CheckoutPage(page);
  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';
  const cartQuantity = '1';
  const productQuantity = '1'

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
  
  await test.step('Add product to cart', async () => {
    await productPage.addToCartButton.click();
  });

  await test.step('Verify success toast notification', async () => {
    await expect(productPage.toast).toBeVisible();
    await expect(productPage.toast).toContainText('Product added to shopping cart');
    await expect(productPage.toast).toBeHidden({ timeout: 8000 });
    await expect(productPage.cartQuantity).toHaveText(cartQuantity);
  });

  await test.step('Open cart', async () => {
    await productPage.header.cartButton.click();
  });

  await test.step('Verify product details in the cart', async () => {
    await expect(page).toHaveURL(/\/checkout/);
    await expect(checkOutPage.productQuantity).toHaveValue(productQuantity);
    await expect(checkOutPage.productTitle).toHaveText(productName);
    await expect(checkOutPage.proceedToCheckoutButton).toBeVisible();
  });
});