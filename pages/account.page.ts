import { Locator, Page } from "@playwright/test";

export class AccountPage {
  page: Page;
  pageTitle: Locator;
  accountName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.getByTestId('page-title');
    this.accountName = this.page.getByTestId('nav-menu');
  }

  getPageTitle(): Locator {
  return this.pageTitle;
  }

  getAccountName(): Locator {
  return this.accountName;
  }


  
}