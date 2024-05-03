// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page, context }) => {
  let interceptionsCount = 0;

  await context.route('https://filesampleshub.com/download/archive/zip/sample1.zip', async route => {
    interceptionsCount++;
    const headers = route.request().headers();
    headers['added-header'] = 'test value';
    await route.continue({ headers });
  });

  await page.goto('https://filesampleshub.com/format/archive/zip');
  await page.getByText('Download sample zip file').first().click();

  await page.waitForTimeout(5000);

  expect(interceptionsCount).toBe(1);
});