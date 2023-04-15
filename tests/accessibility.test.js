const { test, expect, chromium } = require('@playwright/test');
const { injectAxe, checkA11y } = require("axe-playwright")

let browser;
let page;

test.describe('Main page validation', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch()
    page = await browser.newPage()
    await page.goto("https://areena.yle.fi/tv")

    await injectAxe(page)
  })

  test("validate page", async () => {
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    })
  })
});