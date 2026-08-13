import { test } from '../../fixtures/test.fixture';

// Tagged @e2e, not @smoke. This test submits a real application against the
// live relay - it must NOT run on every push the way the fast landing-page
// smoke checks do. Wire this to a manual-trigger-only job in playwright.yml.
test(
  'Consumer completes full application and reaches confirmation',
  { tag: ['@e2e', '@consumer'] },
  async ({ depositPage }) => {
    await test.step('Open relay and authenticate', async () => {
      await depositPage.navigate(process.env.CONSUMER_URL!);
      await depositPage.enterCode(process.env.CONSUMER_CODE!);
    });

    await test.step('Complete welcome flow', async () => {
      await depositPage.completeWelcome();
    });

    await test.step('Reach application landing page', async () => {
      await depositPage.assertApplicationPage();
    });

    await test.step('Confirm Owner is complete', async () => {
      await depositPage.assertOwnerComplete();
    });

    await test.step('Add a product', async () => {
      await depositPage.addProduct('nickName', '2000');
    });

    await test.step('Accept terms and submit', async () => {
      await depositPage.acceptTermsAndSubmit();
    });

    await test.step('Verify confirmation', async () => {
      await depositPage.assertConfirmation();
    });
  }
);