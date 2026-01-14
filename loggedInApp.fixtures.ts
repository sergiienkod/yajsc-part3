import { test as base } from './app.fixtures';
import { AllPages } from './pages/allPages';


type LoggedInFixtures = {
  loggedInApp: AllPages;
};

export const test = base.extend<LoggedInFixtures>({
  
  loggedInApp: async ({ allPages }, use) => {
    const EMAIL = 'customer@practicesoftwaretesting.com';
    const PASSWORD = 'welcome01';
    
    await allPages.loginPage.goToLoginPage();
    await allPages.loginPage.performLogin(EMAIL, PASSWORD);

    await allPages.accountPage.waitUntilOpened();
    
    await use(allPages);
  },
});

export { expect } from '@playwright/test';