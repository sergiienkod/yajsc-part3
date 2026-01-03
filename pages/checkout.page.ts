import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  productTitle: Locator;
  productQuantity: Locator;
  proceedToCheckout: Locator;
  

  constructor(page:Page) {
        this.page = page;
        this.productTitle = this.page.getByTestId('product-title');
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.proceedToCheckout = this.page.getByTestId('proceed-1');
    }
}