import { test as base } from './app.fixtures';
import { AllPages } from '../pages/allPages';


type LoggedInWithAPIFixtures = {
  loggedInWithAPIApp: AllPages;
};

export const test = base.extend<LoggedInWithAPIFixtures>({
  
  loggedInWithAPIApp: async ({ request, page }, use) => {

  const resp = await request.post(
    'https://api.practicesoftwaretesting.com/users/login',
    {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
      },
    }
  );

  type LoginResponse = { access_token: string;};

  const jsonData = (await resp.json()) as LoginResponse;
  const token = jsonData.access_token;

  await page.goto('/');

  await page.evaluate((token) => {
    localStorage.setItem('auth-token', token);
  }, token);

  await page.reload();

  const allPages = new AllPages(page);
  await use(allPages);
  },
});

export { expect } from '@playwright/test';