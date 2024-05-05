// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page, context }) => {
  let interceptionsCount = 0;

  await context.route('https://denis-domanskii.github.io/playwright-download-intercept-issue/archive.zip', async route => {
    interceptionsCount++;
    await route.continue();
  });

  await page.goto('https://denis-domanskii.github.io/playwright-download-intercept-issue/');
  await page.getByText("Download (with 'download' attr)").click();
  await page.getByText("Download (with 'download' attr)").click();

  await page.waitForTimeout(5000);

  expect(interceptionsCount).toBe(2);
});