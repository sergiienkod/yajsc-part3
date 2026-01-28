import { Category } from '../pages/enums';
import { expect, test } from '../fixtures/app.fixtures';

test('C107 Filter products by category Sander', { tag: '@regression' }, async ({ allPages }) => {
  test.skip(!!process.env.CI, 'Skipped in CI due to Cloudflare');

    await allPages.homePage.open();
    await allPages.homePage.selectCategory(Category.SANDER);

    await allPages.homePage.waitForProduct('Sander');

    const titles = await allPages.homePage.getVisibleProductTitles();
    titles.forEach(title => expect(title).toContain('Sander'));
});