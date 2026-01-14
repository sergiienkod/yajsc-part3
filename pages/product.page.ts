import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from './header.fragment.js';
export class ProductPage {
  page: Page;
  header: HeaderFragment;
  productName: Locator;
  unitPrice: Locator;
  addToCartButton: Locator;
  addToFavorites: Locator;
  toast: Locator;
  cartQuantity: Locator;


  constructor(page:Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = this.page.getByTestId('product-name');
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCartButton = this.page.getByTestId('add-to-cart');
        this.addToFavorites = this.page.getByTestId('add-to-favorites');
        this.toast = this.page.locator('#toast-container div.toast-message');
        this.cartQuantity = this.page.getByTestId('cart-quantity');
    }
  
  async getProductTitle(): Promise<string> {
    const title = await this.productName.textContent();
    if (!title) {
      throw new Error('Product title is not available');
    }
    return title.trim();
  }

  async getProductPrice(): Promise<number> {
    const priceText = await this.unitPrice.textContent();
    if (!priceText) {
      throw new Error('Product price is not available');
    }
    return Number(priceText.replace('$', ''));
  }  

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await this.toast.waitFor({ state: 'visible' });
    await this.toast.waitFor({ state: 'hidden', timeout: 8000 });
  }

  
}
