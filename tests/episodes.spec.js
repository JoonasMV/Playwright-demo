const { test, expect } = require('@playwright/test')

const url = 'https://areena.yle.fi/1-3339547'

test('Contains 3rd season', async ({ page }) => {
  await page.goto(url)

  await expect(page).toHaveTitle(/Kummeli/)

  const season3Button = page.getByRole('button', { name: 'Kausi 3' })

  await expect(season3Button).toBeVisible()
})

test('5th episode contains correct name', async ({ page }) => {
  await page.goto(url)
  const season3Button = page.getByRole('button', { name: 'Kausi 3' })

  await season3Button.click()

  const episode = page.getByRole('link', { name: '5. Kummeli' })

  await expect(episode).toBeVisible()
})

test('5th episode contains correct date', async ({ page }) => {
  await page.goto(url)
  const season3Button = page.getByRole('button', { name: 'Kausi 3' })

  await season3Button.click()

  const date = 'ti 8.3.2016'
  const name = '5. Kummeli'

  const elem = page.getByRole('group', { name }).getByText(date)
  await expect(elem).toBeVisible()
})
