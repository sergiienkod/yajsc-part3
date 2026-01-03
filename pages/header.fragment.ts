import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  page: Page;
  accountName: Locator;
  cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountName = page.getByTestId('nav-menu');
    this.cartButton = page.getByTestId('nav-cart');
  }

  async clickCart(): Promise<void> {
    await this.cartButton.click();
  }
}
