const { test, expect, chromium } = require('@playwright/test');
require('dotenv').config();

// Add random delays to simulate human behavior
const randomDelay = (min, max) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

test.describe('Gmail Automation', () => {
  let browser;
  let context;
  let page;
  let replyMessage;

  test.beforeEach(async () => {
    // Launch browser with additional settings to appear more human-like
    browser = await chromium.launch({ 
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials'
      ]
    });

    // Create a new context with specific viewport and user agent
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      locale: 'en-US',
      timezoneId: 'America/New_York',
      geolocation: { longitude: -74.006, latitude: 40.7128 },
      permissions: ['geolocation']
    });

    page = await context.newPage();
  });

  test('Automate Gmail Reply', async () => {
    await test.step('Navigate to Gmail', async () => {
      await page.goto('https://gmail.com');
      await randomDelay(500, 1000);
    });

    await test.step('Login to Gmail', async () => {
      await page.fill('input[type="email"]', process.env.GMAIL_EMAIL);
      await randomDelay(300, 500);
      await page.click('button:has-text("Next")');
      
      await page.waitForSelector('input[type="password"]', { timeout: 10000 });
      await randomDelay(500, 1000);
      
      const password = process.env.GMAIL_PASSWORD;
      for (const char of password) {
        await page.type('input[type="password"]', char);
        await randomDelay(30, 80);
      }
      
      await randomDelay(300, 500);
      await page.click('button:has-text("Next")');
      await page.waitForLoadState('networkidle');
      await randomDelay(1000, 2000);
    });

    await test.step('Search for email', async () => {
      await page.click('input[placeholder="Search mail"]');
      await randomDelay(300, 500);
      const searchQuery = 'from:prateek';
      for (const char of searchQuery) {
        await page.type('input[placeholder="Search mail"]', char);
        await randomDelay(30, 80);
      }
      await randomDelay(300, 500);
      await page.keyboard.press('Enter');
      await randomDelay(2000, 3000);
    });

    await test.step('Find and click first email', async () => {
      //assuming it's the first email in the list alternatively we can use the email subject to click the correct email
      await page.evaluate(() => {
        const elements = document.querySelectorAll('table[role="grid"] tr.zA');
        const firstVisible = Array.from(elements).find(el => el.offsetParent !== null);
        if (firstVisible) {

          firstVisible.click();
        }
      });
    });

    await test.step('Reply to email', async () => {
      await page.waitForSelector('div[role="button"][aria-label="Reply"]');
      await randomDelay(500, 1000);
      await page.click('div[role="button"][aria-label="Reply"]');
      
      await page.waitForSelector('div[role="textbox"]');
      await randomDelay(500, 1000);
      replyMessage = 'I accept the invitation to proceed to the next round.';
      for (const char of replyMessage) {
        await page.type('div[role="textbox"]', char);
        await randomDelay(30, 80);
      }
      
      await randomDelay(500, 1000);
      await page.click('div[role="button"]:has-text("Send")');
    });

    await test.step('Validate reply', async () => {
      await randomDelay(1000, 2000);
      //validate the reply message to be sent successfully and match the reply message
      const lastReplyText = await page.textContent('div[role="listitem"]:last-child div[dir="ltr"]');
      if(!expect(lastReplyText).toBe(replyMessage)){
        console.log('Reply sent successfully');
      }else{
        console.log('Reply failed');
      }

    });


  });

  test.afterEach(async () => {
    await browser.close();
  });
});