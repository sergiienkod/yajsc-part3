import { test, expect } from '../fixtures/loggedInAppWithAPI.fixtures';
import { TEST_CARD } from '../testData/creditCard';

test('C103 User can complete checkout with credit card using login via API', { tag: '@regression' }, async ({ loggedInWithAPIApp }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');

  await loggedInWithAPIApp.homePage.open();

  const productTitle = await loggedInWithAPIApp.homePage.getFirstProductTitle();
  await loggedInWithAPIApp.homePage.clickProduct(productTitle);

  const productPrice = await loggedInWithAPIApp.productPage.getProductPrice();
  await loggedInWithAPIApp.productPage.addToCart();


  await loggedInWithAPIApp.productPage.header.clickCart();

  expect(await loggedInWithAPIApp.checkOutPage.getProductTitle()).toBe(productTitle);

  expect(await loggedInWithAPIApp.checkOutPage.getProductPrice()).toBe(productPrice);

  expect(await loggedInWithAPIApp.checkOutPage.getTotalPrice()).toBe(productPrice);

  await loggedInWithAPIApp.checkOutPage.proceedToBilling();


  await loggedInWithAPIApp.checkOutPage.handleAlreadyLoggedInAndFillBilling(
    '1010',
    'Vienna'
  );

  await loggedInWithAPIApp.checkOutPage.payWithCreditCard(TEST_CARD);

  await loggedInWithAPIApp.checkOutPage.waitForPaymentSuccess();

  await expect(loggedInWithAPIApp.checkOutPage.paymentSuccessMessage).toBeVisible();
});