import { test as base } from './app.fixtures';
import { AllPages } from '../pages/allPages';
import { TEST_USER } from '../testData/testUser';

const { email, password } = TEST_USER;


type LoggedInFixtures = {
  loggedInApp: AllPages;
};

export const test = base.extend<LoggedInFixtures>({
  
  loggedInApp: async ({ allPages }, use) => {
    
    await allPages.loginPage.goToLoginPage();
    await allPages.loginPage.performLogin(email, password);

    await allPages.accountPage.waitUntilOpened();
    
    await use(allPages);
  },
});

export { expect } from '@playwright/test';