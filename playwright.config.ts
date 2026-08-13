import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',

  // Application can take time to initialize.
  timeout: 90_000,
  expect: {
    timeout: 35_000,
  },

  // Consumer and Entity workflows can execute independently.
  fullyParallel: true,
  // Prevent accidental test.only() from being pushed to CI.
  forbidOnly: !!process.env.CI,
  // Retry only in CI.
  retries: process.env.CI ? 1 : 0,
  // Limit CI parallelism.
  workers: process.env.CI ? 2 : undefined,
  preserveOutput: 'failures-only',

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
      },
    ],
  ],

  use: {
    navigationTimeout: 60_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});