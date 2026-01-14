import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  productTitle: Locator;
  productQuantity: Locator;
  proceedToCheckoutButton: Locator;
  productPrice: Locator;
  totalPrice: Locator;

  loggedInNotice: Locator;
  postcode: Locator;
  state: Locator;
  proceedToBillingButton: Locator;
  proceedToPaymentButton: Locator;

  paymentTypeDropdown: Locator;

  cardNumber: Locator;
  expirationDate: Locator;
  cvv: Locator;
  cardHolderName: Locator;
  confirmPaymentButton: Locator;
  paymentSuccessMessage: Locator;

  constructor(page:Page) {
        this.page = page;
        this.productTitle = this.page.getByTestId('product-title');
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.proceedToCheckoutButton = this.page.getByTestId('proceed-1');
        this.productPrice = page.getByTestId('product-price');
        this.totalPrice = page.getByTestId('cart-total');

        this.loggedInNotice = page.locator('p.ng-star-inserted');
        this.postcode = page.getByTestId('postal_code');
        this.state = page.getByTestId('state');
        this.proceedToBillingButton = page.getByTestId('proceed-2');
        this.proceedToPaymentButton = page.getByTestId('proceed-3');

        this.paymentTypeDropdown = page.getByTestId('payment-method');

        this.cardNumber = page.getByTestId('credit_card_number');
        this.expirationDate = page.getByTestId('expiration_date');
        this.cvv = page.getByTestId('cvv');
        this.cardHolderName = page.getByTestId('card_holder_name');
        this.confirmPaymentButton = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    }

  async getProductTitle(): Promise<string> {
    const title = await this.productTitle.textContent();
    if (!title) throw new Error('Product title not found in checkout');
    return title.trim();
  }

  async getProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    if (!priceText) throw new Error('Product price not found');
    return Number(priceText.replace('$', ''));
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.totalPrice.textContent();
    if (!totalText) throw new Error('Total price not found');
    return Number(totalText.replace('$', ''));
  }

  async proceedToBilling(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  } 
  
  async handleAlreadyLoggedInAndFillBilling(postcode: string, state: string): Promise<void> {
    const message = await this.loggedInNotice.textContent();
    if (message?.includes('already logged in')) {
      await this.proceedToBillingButton.click();
    }

    await this.postcode.waitFor({ state: 'visible' });

    if (!(await this.postcode.inputValue())) {
      await this.postcode.fill(postcode);
    }

    if (!(await this.state.inputValue())) {
    await this.state.fill(state);
    }

    await this.proceedToPaymentButton.click();
  }

  getExpirationDatePlusMonths(months: number): string {
    const today = new Date();
    const expMonth = today.getMonth() + 1 + months;
    const expYear = today.getFullYear() + Math.floor(expMonth / 12);
    const month = ((expMonth - 1) % 12) + 1;
    const monthStr = month.toString().padStart(2, '0');
    return `${monthStr}/${expYear}`;
  }
  
  async payWithCreditCard(cardHolder: string = 'Test User'): Promise<void> {
  
    await this.paymentTypeDropdown.selectOption({ label: 'Credit Card' });

    await this.cardNumber.fill('1111-1111-1111-1111');
    await this.expirationDate.fill(this.getExpirationDatePlusMonths(3));
    await this.cvv.fill('111');
    await this.cardHolderName.fill(cardHolder);

    await this.confirmPaymentButton.click();
  }
  
  async waitForPaymentSuccess(): Promise<void> {
    await this.paymentSuccessMessage.waitFor({ state: 'visible' });
  }
}