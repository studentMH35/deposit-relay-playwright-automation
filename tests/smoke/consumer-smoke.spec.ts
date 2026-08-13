import { test } from '../../fixtures/test.fixture';

test(
  'Consumer workflow should authenticate and reach application',
  { tag: ['@smoke', '@consumer'] },
  async ({ depositPage }) => {
    await test.step('Navigate to Consumer relay URL', async () => {
      await depositPage.navigate(process.env.CONSUMER_URL!);
    });

    await test.step('Enter consumer OTP', async () => {
      await depositPage.enterCode(process.env.CONSUMER_CODE!);
    });

    await test.step('Complete welcome flow', async () => {
      await depositPage.completeWelcome();
    });

    await test.step('Assert application page visible', async () => {
      await depositPage.assertApplicationPage();
    });
  }
);