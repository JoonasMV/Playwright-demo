// @ts-check
const { test } = require('../fixtures.js')
const { expect } = require('@playwright/test')

//test case for checking 10 o'clock news
test("check ten o'clock news", async ({ page }) => {
  let match = false

  await page.goto('https://areena.yle.fi/tv/') //go to yle.fi
  await page.click('#menu-main > ul > li:nth-child(4) > a > span') //go to ohjelmat page

  await page.getByLabel('Näytä menneet ohjelmat').check() //check past programs checkbox
  expect(await page.getByLabel('Näytä menneet ohjelmat').isChecked()).toBeTruthy()

  //go through all channels
  for (const li of await page.locator('.guide-channels__channel').all()) {
    //find mtv3
    if (await li.getByLabel('MTV3').isVisible()) {
      //check if a schedule card exists with both the correct time and title
      for (const listItem of await li.locator('.schedule-card__header').all()) {
        const time = await listItem
          .locator('.schedule-card__publication')
          .getByText('22.00')
          .isVisible()
        const title = await listItem
          .locator('.schedule-card__title')
          .getByText('Kymmenen uutiset')
          .isVisible()
        if (time && title) {
          match = true
        }
      }
      continue //when found mtv3 -> no need to check anymore channels
    }
  }
  expect(match).toBe(true)
})
