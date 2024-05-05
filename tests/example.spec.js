// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page, context }) => {
  let interceptionsCount = 0;

  await context.route('https://denis-domanskii.github.io/playwright-download-intercept-issue/archive.zip', async route => {
    interceptionsCount++;
    await route.continue();
  });

  await page.goto('https://denis-domanskii.github.io/playwright-download-intercept-issue/');

  // FAIL: <a> tag with download is invisible for DevTools and Playwright intercept
  const downloadPromise1 = page.waitForEvent('download');
  await page.getByText("Download (with 'download' attr)").click();
  await downloadPromise1;

  // SUCCESS: <a> tag with download is visible for DevTools and Playwright intercept
  const downloadPromise2 = page.waitForEvent('download');
  await page.getByText("Download (without 'download' attr)").click();
  await downloadPromise2;

  expect(interceptionsCount).toBe(2);
});