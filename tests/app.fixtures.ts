import { test as base } from '@playwright/test';
import { AllPages } from '../pages/allPages';

type AppFixtures = {
  allPages: AllPages;
};

export const test = base.extend<AppFixtures>({
  
  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);
    await use(allPages);
  },
});

export { expect } from '@playwright/test';