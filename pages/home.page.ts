import { Page } from "@playwright/test";

export class HomePage {
    page:Page;
    
    constructor(page:Page) {
        this.page=page;
        }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async clickProduct(productName: string): Promise<void> {
    await this.page.getByTestId('product-name').getByText(productName).click();
  }
    
}