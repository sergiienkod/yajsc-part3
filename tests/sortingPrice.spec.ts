import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SortOption } from '../pages/enums';

test('Sort products by Price Low-High', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.selectSort(SortOption.PRICE_ASC);

    const products = await homePage.getProductsDetails();
    const actualPrices = products.map(p => p.price);

    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
});

test('Sort products by Price High-Low', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.selectSort(SortOption.PRICE_DESC);

    const products = await homePage.getProductsDetails();
    const actualPrices = products.map(p => p.price);

    const expectedPrices = [...actualPrices].sort((a, b) => b - a);

    expect(actualPrices).toEqual(expectedPrices);
});