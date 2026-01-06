import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from './header.fragment.js';
export class ProductPage {
  page: Page;
  header: HeaderFragment;
  productName: Locator;
  unitPrice: Locator;
  addToCart: Locator;
  addToFavorites: Locator;
  toast: Locator;
  cartQuantity: Locator;


  constructor(page:Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = this.page.getByTestId('product-name');
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCart = this.page.getByTestId('add-to-cart');
        this.addToFavorites = this.page.getByTestId('add-to-favorites');
        this.toast = this.page.locator('#toast-container div.toast-message');
        this.cartQuantity = this.page.getByTestId('cart-quantity');
    }
}
