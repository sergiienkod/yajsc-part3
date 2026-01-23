import { Page } from "@playwright/test";
import { AccountPage } from "./account.page";
import { LoginPage } from "./login.page";
import { CheckoutPage } from "./checkout.page";
import { HomePage } from "./home.page";
import { ProductPage } from "./product.page";

export class AllPages {
    page: Page;
    loginPage: LoginPage;
    accountPage: AccountPage;
    checkOutPage: CheckoutPage;
    homePage: HomePage;
    productPage: ProductPage;

    constructor( page: Page ) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.checkOutPage = new CheckoutPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
    }
}