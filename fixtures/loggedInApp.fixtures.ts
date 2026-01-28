import { test as base } from './app.fixtures';
import { AllPages } from '../pages/allPages';
import { USER } from '../config/baseConfig';


type LoggedInFixtures = {
  loggedInApp: AllPages;
};

export const test = base.extend<LoggedInFixtures>({
  
  loggedInApp: async ({ allPages }, use) => {
    
    await allPages.loginPage.goToLoginPage();
    await allPages.loginPage.performLogin(USER.email, USER.password);

    await allPages.accountPage.waitUntilOpened();
    
    await use(allPages);
  },
});

export { expect } from '@playwright/test';