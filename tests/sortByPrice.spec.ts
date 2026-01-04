import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SortOption } from '../pages/enums';

const priceSortCases = [
  SortOption.PRICE_ASC,
  SortOption.PRICE_DESC,
];

priceSortCases.forEach(sortOption => {
  test(`Verify sorting by price: ${sortOption}`, async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
  
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.selectSort(sortOption);

    const products = await homePage.getProductsDetails();
    const actualPrices = products.map(p => p.price);

    const expectedPrices = [...actualPrices].sort((a, b) =>
      sortOption === SortOption.PRICE_ASC
        ? a - b
        : b - a
    );

    expect(actualPrices).toEqual(expectedPrices);
  });
});