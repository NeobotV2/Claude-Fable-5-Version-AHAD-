import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  workers: 1,
  retries: 0,
  reporter: 'list',
  timeout: 90_000,
  use: { baseURL: process.env.LIVE_URL || 'https://www.ahad-cleaning.de', trace: 'off' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
