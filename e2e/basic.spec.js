// /e2e/basic.spec.js
const { test, expect } = require('@playwright/test');

test('homepage -> research -> about nav works', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // 1) Hero present (stable selector)
  await expect(page.getByTestId('hero-title')).toBeVisible({ timeout: 15000 });

  // 2) Click header nav link (scope to header <nav> so we don't hit the hero CTA)
  const headerNav = page.getByRole('navigation').first();
  await headerNav.getByRole('link', { name: 'Research', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Research', level: 1 })
  ).toBeVisible({ timeout: 15000 });

  // 3) Go to About via header nav again
  const headerNavAgain = page.getByRole('navigation').first();
  await headerNavAgain.getByRole('link', { name: 'About', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'About', level: 1 })
  ).toBeVisible({ timeout: 15000 });
});
