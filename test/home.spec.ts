import { expect, test } from '@playwright/test';

import HomePage from './object/HomePage';

test('It opens home page', async ({ page }) => {
	const home = new HomePage(page);
	await home.load();

	await test.step('check header and page title', async () => {
		const banner = home.getBanner();
		const h1 = banner.getHeading({
			name: 'Game Assistant for One Night Ultimate Werewolf',
			level: 1,
		});
		expect(await h1.isVisible()).toBe(true);
	});

	await test.step('check entries', async () => {
		const main = home.getMain();
		const create = main.getButton({ name: 'Create Room' });
		expect(await create.isVisible()).toBe(true);
		const roomNumber = main.getSpinButton({ name: 'Room Number' });
		expect(await roomNumber.isVisible()).toBe(true);
		const join = main.getButton({ name: 'Join Room' });
		expect(await join.isVisible()).toBe(true);
	});

	await test.step('take a full screenshot', async () => {
		await page.screenshot({
			path: 'output/home.png',
			fullPage: true,
		});
	});
});
