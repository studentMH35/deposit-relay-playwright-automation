import { test } from '../../fixtures/test.fixture';

test(
  'Entity workflow should authenticate and reach application',
  { tag: ['@smoke', '@entity'] },
  async ({ depositPage }) => {
    await test.step('Navigate to Entity relay URL', async () => {
      await depositPage.navigate(process.env.ENTITY_URL!);
    });

    await test.step('Enter entity OTP', async () => {
      await depositPage.enterCode(process.env.ENTITY_CODE!);
    });

    await test.step('Complete welcome flow', async () => {
      await depositPage.completeWelcome();
    });

    await test.step('Assert application page visible', async () => {
      await depositPage.assertApplicationPage();
    });
  }
);