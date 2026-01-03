import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SortOption } from '../pages/enums';

test('Sort products by Name A-Z', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
    
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.selectSort(SortOption.NAME_ASC);

    const products = await homePage.getProductsDetails();
    const actualTitles = products.map(p => p.title);

    const expectedTitles = [...actualTitles].sort((a, b) => a.localeCompare(b));

    expect(actualTitles).toEqual(expectedTitles);
});

test('Sort products by Name Z-A', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');
    
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.selectSort(SortOption.NAME_DESC);

    const products = await homePage.getProductsDetails();
    const actualTitles = products.map(p => p.title);

    const expectedTitles = [...actualTitles].sort((a, b) => b.localeCompare(a));

    expect(actualTitles).toEqual(expectedTitles);
});