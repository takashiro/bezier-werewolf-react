import { test } from '@playwright/test';

test('It opens home page', async ({ page }) => {
	await page.goto('/#room-creator');
	await page.screenshot({
		path: 'output/room-creator.png',
		fullPage: true,
	});
});
