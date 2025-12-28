import { Locator, Page, expect } from "@playwright/test";

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
  
   async verifyProductDetails(expectedName: string, expectedPrice: string): Promise<void> {
        await expect(this.page).toHaveURL(/\/product/);
        await expect(this.productName).toHaveText(expectedName);
        await expect(this.unitPrice).toHaveText(expectedPrice);
        await expect(this.addToCart).toBeVisible();
        await expect(this.addToFavorites).toBeVisible();
    }


}
