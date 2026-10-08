import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { TodoPage } from '../pages/TodoPage';

type DemoFixtures = {
  loginPage: LoginPage;
  todoPage: TodoPage;
};

export const test = base.extend<DemoFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  todoPage: async ({ page }, use) => {
    await use(new TodoPage(page));
  },
});

export { expect } from '@playwright/test';
