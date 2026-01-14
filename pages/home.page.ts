import { Locator, Page } from "@playwright/test";
import { SortOption, Category } from "./enums";
export class HomePage {
    page: Page;
    productName: Locator;
    sortDropdown: Locator;
    productCards: Locator;
    
    constructor(page:Page) {
        this.page=page;
        this.productName = this.page.getByTestId('product-name');
        this.sortDropdown = this.page.getByTestId('sort');
        this.productCards = this.page.locator('.card');
        }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async clickProduct(productName: string): Promise<void> {
        await this.productName.getByText(productName).click();
    }

    async selectSort(option: SortOption): Promise<void> {
        await this.sortDropdown.selectOption({ label: option });
    }

    async selectCategory(category: Category) {
        await this.page.getByText(category).click();
    }  

    async getProductsDetails(): Promise<{ title: string; price: number }[]> {
    
        const titles = await this.page.getByTestId('product-name').allTextContents();
        const pricesText = await this.page.getByTestId('product-price').allTextContents();

    
        return titles.map((title, index) => ({
          title,
          price: Number(pricesText[index].replace('$', '')),
    }));
    }

    async getProductDetailsByTitle(productTitle: string): Promise<{ title: string; price: number } | undefined> {
        const allProducts = await this.getProductsDetails();
        return allProducts.find(p => p.title.includes(productTitle));
    }

    async getVisibleProductTitles(): Promise<string[]> {
        return (await this.productName.allTextContents()).map(t => t.trim());
    }

    async waitForProduct(productName: string): Promise<void> {
        await this.page.locator(`.card >> text=${productName}`).first().waitFor({ state: 'visible' });
    }

    async getFirstProductTitle(): Promise<string> {
        const title = await this.productName.first().textContent();

        if (!title) {
          throw new Error('No products found on Home page');
        }
        
        return title.trim();
    }

}