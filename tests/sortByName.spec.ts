import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SortOption } from '../pages/enums';

const nameSortCases = [
  SortOption.NAME_ASC,
  SortOption.NAME_DESC,
];

nameSortCases.forEach(sortOption => {
  test(`Verify sorting by name: ${sortOption}`, async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
    
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.selectSort(sortOption);

    const products = await homePage.getProductsDetails();
    const actualTitles = products.map(p => p.title);

    const expectedTitles = [...actualTitles].sort((a, b) =>
      sortOption === SortOption.NAME_ASC
        ? a.localeCompare(b)
        : b.localeCompare(a)
    );

    expect(actualTitles).toEqual(expectedTitles);
  });
});