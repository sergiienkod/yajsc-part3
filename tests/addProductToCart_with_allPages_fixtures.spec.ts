import { expect, test } from '../app.fixtures';


test('Verify user can add product to cart with allPages fixture', async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const productName = 'Slip Joint Pliers';
  const productPrice = '9.17';
  const cartQuantity = '1';
  const productQuantity = '1'

  await allPages.homePage.open();
  await allPages.homePage.clickProduct(productName);

  await expect(page).toHaveURL(/\/product/);
  await expect(allPages.productPage.productName).toHaveText(productName);
  await expect(allPages.productPage.unitPrice).toHaveText(productPrice);
  await allPages.productPage.addToCartButton.click();
  await expect(allPages.productPage.toast).toBeVisible();
  await expect(allPages.productPage.toast).toContainText('Product added to shopping cart');
  await expect(allPages.productPage.toast).toBeHidden({ timeout: 8000 });
  await expect(allPages.productPage.cartQuantity).toHaveText(cartQuantity);

  await allPages.productPage.header.cartButton.click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(allPages.checkOutPage.productQuantity).toHaveValue(productQuantity);
  await expect(allPages.checkOutPage.productTitle).toHaveText(productName);
  await expect(allPages.checkOutPage.proceedToCheckoutButton).toBeVisible();
});