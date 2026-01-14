import { Page } from "@playwright/test";
import { AccountPage } from "./account.page";
import { LoginPage } from "./login.page";
import { CheckoutPage } from "./checkout.page";
import { HomePage } from "./home.page";
import { ProductPage } from "./product.page";
import { HeaderFragment } from "./header.fragment";

export class AllPages {
    page: Page;
    loginPage: LoginPage;
    accountPage: AccountPage;
    checkOutPage: CheckoutPage;
    homePage: HomePage;
    productPage: ProductPage;
    headerFragment: HeaderFragment;

    constructor( page: Page ) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.checkOutPage = new CheckoutPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.headerFragment = new HeaderFragment(page);
    }
}