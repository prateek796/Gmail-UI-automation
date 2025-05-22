// @ts-check
const { defineConfig } = require('@playwright/test');


// since we are using the gmail account for the test, we need to use the headless mode to 
// avoid the login popup and gmail blocks automations or give captcha to verify, 
// we have added few extra options to avoid the captcha and make it feel like a actual user.
module.exports = defineConfig({
  testDir: './specs',
  timeout: 120000,
  expect: {
    timeout: 10000
  },
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 30000,
    trace: 'on-first-retry',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-US',
    timezoneId: 'America/New_York',
    geolocation: { longitude: -74.006, latitude: 40.7128 },
    permissions: ['geolocation'],
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials'
      ]
    }
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ]
}); 