import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/scenarios/tests',

  timeout: 120000,

  retries: process.env.CI ? 1 : 0,

  use: {
    baseURL: 'https://the-internet.herokuapp.com',

    headless: true,

    viewport: { width: 1280, height: 720 },

    ignoreHTTPSErrors: true,

    locale: 'en-US',

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  expect: {
    timeout: 30000,
  },

  outputDir: 'artifacts/',

  reporter: [
    ['html', { outputFolder: 'artifacts/report', open: 'never' }],
    ['list'],
  ],
});