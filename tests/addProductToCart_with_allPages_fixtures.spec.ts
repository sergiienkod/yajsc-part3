import { expect, test } from '../fixtures/app.fixtures';

test('C101 Verify user can add product to cart with allPages fixture', { tag: '@smoke' }, async ({ allPages, page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
  const product = {
    name : 'Slip Joint Pliers',
    price : '9.17',
    cartQuantity : '1',
    productQuantity : '1'
  };

  await test.step('Open homepage', async () => {
    await allPages.homePage.open();
  });

  await test.step('Click on the product', async () => {
    await allPages.homePage.clickProduct(product.name);
  });
  
  await test.step('Verify product details', async () => {
    await expect(page).toHaveURL(/\/product/);
    await expect(allPages.productPage.productName).toHaveText(product.name);
    await expect(allPages.productPage.unitPrice).toHaveText(product.price);
  });

  await test.step('Add product to cart', async () => {
    await allPages.productPage.addToCartButton.click();
  });

  await test.step('Verify success toast notification', async () => {
    await expect(allPages.productPage.toast).toBeVisible();
    await expect(allPages.productPage.toast).toContainText('Product added to shopping cart');
    await expect(allPages.productPage.toast).toBeHidden({ timeout: 8000 });
    await expect(allPages.productPage.cartQuantity).toHaveText(product.cartQuantity);
  });

  await test.step('Open cart', async () => {
    await allPages.productPage.header.cartButton.click();
  });

  await test.step('Verify product details in the cart', async () => {
    await expect(page).toHaveURL(/\/checkout/);
    await expect(allPages.checkOutPage.productQuantity).toHaveValue(product.productQuantity);
    await expect(allPages.checkOutPage.productTitle).toHaveText(product.name);
    await expect(allPages.checkOutPage.proceedToCheckoutButton).toBeVisible();
  });
});