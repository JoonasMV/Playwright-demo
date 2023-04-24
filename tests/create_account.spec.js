const { test } = require('../fixtures.js')
const { expect } = require('@playwright/test')

const url = 'https://areena.yle.fi/tv'

test('Error is shown if email wrong', async ({ page, browserName }) => {
  await page.goto(url)

  if (browserName == 'firefox') {
    const cookies = page.getByRole('button', { name: 'Hyväksy kaikki' })

    if (cookies) {
      await cookies.click()
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
    }
  }

  await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click({ delay: 100 })
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('button', { name: 'Luo Yle Tunnus' })
    .click()

  const invalidEmail = 'invalid.dev'
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel('Sähköposti')
    .fill(invalidEmail)
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('button', { name: 'Luo Tunnus' })
    .click()
  const error = page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByText('Tarkista sähköpostiosoitteen muoto.')
  await expect(error).toBeVisible()
})

test('Success if email is valid', async ({ page, browserName }) => {
  await page.goto(url)
  if (browserName == 'firefox') {
    const cookies = page.getByRole('button', { name: 'Hyväksy kaikki' })

    if (cookies) {
      await cookies.click()
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
    }
  }
  await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click({ delay: 100 })
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('button', { name: 'Luo Yle Tunnus' })
    .click()

  const validEmail = 'valid@valid.dev'
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel('Sähköposti')
    .fill(validEmail)
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole('button', { name: 'Luo Tunnus' })
    .click()
  const error = page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByText('Tarkista sähköpostiosoitteen muoto.')

  await expect(error).toBeHidden()
})
