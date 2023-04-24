const { injectAxe, checkA11y } = require('axe-playwright')
const { test } = require('../fixtures.js')
const { expect } = require('@playwright/test')

test.describe('Main page validation', () => {
  test('validate page', async ({ page }) => {
    await page.goto('https://areena.yle.fi/tv')

    await injectAxe(page)
    const results = await checkA11y(
      page,
      null,
      {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      },
      (violations) => {
        //console.log(violations)
      },
    )
  })
})

test.describe('Episode page validation', () => {
  test('validate page', async ({ page }) => {
    await page.goto('https://areena.yle.fi/1-3339547')

    await injectAxe(page)
    const results = await checkA11y(
      page,
      null,
      {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      },
      (violations) => {
        // console.log(violations)
      },
    )
  })
})
