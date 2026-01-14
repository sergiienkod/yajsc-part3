import { test, expect } from '../loggedInApp.fixtures';

test('User can complete checkout with credit card', async ({ loggedInApp }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');

  await loggedInApp.homePage.open();

  const productTitle = await loggedInApp.homePage.getFirstProductTitle();
  await loggedInApp.homePage.clickProduct(productTitle);

  const productPrice = await loggedInApp.productPage.getProductPrice();
  await loggedInApp.productPage.addToCart();


  await loggedInApp.headerFragment.clickCart();

  expect(await loggedInApp.checkOutPage.getProductTitle()).toBe(productTitle);

  expect(await loggedInApp.checkOutPage.getProductPrice()).toBe(productPrice);

  expect(await loggedInApp.checkOutPage.getTotalPrice()).toBe(productPrice);

  await loggedInApp.checkOutPage.proceedToBilling();


  await loggedInApp.checkOutPage.handleAlreadyLoggedInAndFillBilling(
    '1010',
    'Vienna'
  );

  
  await loggedInApp.checkOutPage.payWithCreditCard('Jane Doe');

  await loggedInApp.checkOutPage.waitForPaymentSuccess();

  await expect(loggedInApp.checkOutPage.paymentSuccessMessage).toBeVisible();
});