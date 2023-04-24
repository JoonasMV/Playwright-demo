const { test, expect, chromium } = require('@playwright/test');
const { injectAxe, checkA11y } = require("axe-playwright")

let browser;
let page;

const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];  // This is used to get the installed Playwright version on you machine. The same needs to be passed on to BrowserStack so that proper request-response mapping can be done for mismatched client and server Playwright versions in the same test

const caps = {
  'browser': 'playwright-chromium',
  'os': 'os x',
  'os_version': 'mojave',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'joonasviljanen_W8FAdB',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'sANxLpqxoikRsNaubgxU',
  'client.playwrightVersion': clientPlaywrightVersion
};

test.describe('Main page validation', () => {
  test.beforeAll(async () => {
    // browser = await chromium.launch()
    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
    });
    page = await browser.newPage()
    await page.goto("https://areena.yle.fi/tv")

    await injectAxe(page)
  })

  test("validate page", async () => {
    const results = await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    }, (violations) => {
      console.log(violations)
    })
  })
});

test.describe('Episode page validation', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch()
    page = await browser.newPage()
    await page.goto("https://areena.yle.fi/1-3339547")

    await injectAxe(page)
  })

  test("validate page", async () => {
    const results = await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    }, (violations) => {
      console.log(violations)
    })
  })
});

