import { Locator, Page } from "@playwright/test";

export class ProductPage {
  page: Page;
  productName: Locator;
  unitPrice: Locator;
  addToCart: Locator;
  addToFavorites: Locator;

  constructor(page:Page) {
        this.page = page;
        this.productName = this.page.getByTestId('product-name');
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCart = this.page.getByTestId('add-to-cart');
        this.addToFavorites = this.page.getByTestId('add-to-favorites');
    }
}
