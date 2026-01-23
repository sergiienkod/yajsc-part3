import { Locator, Page } from "@playwright/test";
import { getExpirationDatePlusMonths } from "../utils/dateUtils"
import { CreditCardData } from '../types/creditCard';
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
    return (await this.productTitle.textContent())!.trim();
  }

  async getProductPrice(): Promise<number> {
    return Number((await this.productPrice.textContent())!.replace('$', ''));
  }

  async getTotalPrice(): Promise<number> {
    return Number((await this.totalPrice.textContent())!.replace('$', ''));
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
  
  async payWithCreditCard(card: CreditCardData): Promise<void> {
  await this.paymentTypeDropdown.selectOption({ label: 'Credit Card' });
  await this.cardNumber.fill(card.cardNumber);
  await this.expirationDate.fill(card.expiration);
  await this.cvv.fill(card.cvv);
  await this.cardHolderName.fill(card.holder);
  await this.confirmPaymentButton.click();
}
  
  async waitForPaymentSuccess(): Promise<void> {
    await this.paymentSuccessMessage.waitFor({ state: 'visible' });
  }
}