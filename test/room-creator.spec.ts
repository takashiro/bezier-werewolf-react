import { test } from '@playwright/test';

test('It opens home page', async ({ page }) => {
	await page.goto('/?type=room-creator');
	await page.screenshot({
		path: 'output/room-creator.png',
		fullPage: true,
	});
});
