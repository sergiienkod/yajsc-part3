import { Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    productName: Locator;
    
    constructor(page:Page) {
        this.page=page;
        this.productName = this.page.getByTestId('product-name');
        }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async clickProduct(productName: string): Promise<void> {
    await this.productName.getByText(productName).click();
  }
    
}