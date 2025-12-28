import { Locator, Page, expect } from "@playwright/test";

export class AccountPage {
  page: Page;
  pageTitle: Locator;
  accountName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.getByTestId('page-title');
    this.accountName = this.page.getByTestId('nav-menu');
  }

  async verifyAccountPage(expectedName: string): Promise<void> {
  await expect(this.page).toHaveURL(/\/account$/);
  await expect(this.pageTitle).toHaveText('My account');
  await expect(this.accountName).toHaveText(expectedName);
}
}