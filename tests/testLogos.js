const { test } = require('../fixtures.js')
const { expect } = require('@playwright/test')

//test case for checking logos have proper label
test('correct logos', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv/')
  await page.click('#menu-main > ul > li:nth-child(4) > a > span') //go to ohjelmat page
  const element = page.getByRole('heading', { name: 'Yle TV1' })
  const element2 = page.getByRole('heading', { name: 'Yle TV2' })
  const element3 = page.getByRole('heading', { name: 'MTV3' })
  const element4 = page.getByRole('heading', { name: 'Nelonen' })

  await expect(element.locator("[aria-label = 'Yle TV1']")).toBeVisible()
  await expect(element2.locator("[aria-label = 'Yle TV2']")).toBeVisible()
  await expect(element3.locator("[aria-label = 'MTV3']")).toBeVisible()
  await expect(element4.locator("[aria-label = 'Nelonen']")).toBeVisible()
})
