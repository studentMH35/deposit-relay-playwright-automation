import { test as base, expect } from '@playwright/test';
import { DepositPage } from '../pages/deposit.page';

type TestFixtures = {
  depositPage: DepositPage;
};

export const test = base.extend<TestFixtures>({
  depositPage: async ({ page }, use) => {
    const depositPage = new DepositPage(page);

    await use(depositPage);
  },
});

export { expect };