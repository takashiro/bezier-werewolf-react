import { expect, test } from '@playwright/test';

import RoomCreatorPage from './object/RoomCreatorPage';

test('It operates on room creator', async ({ page }) => {
	const creator = new RoomCreatorPage(page);

	await test.step('open creator', async () => {
		await creator.load();
		await page.screenshot({
			path: 'output/room-creator.png',
			fullPage: true,
		});
	});

	await test.step('check default options', async () => {
		const main = creator.getMain();
		const werewolf = main.getSpinButton({ name: 'Werewolf' });
		expect(await werewolf.getValue()).toBe(2);
		const minion = main.getButton({ name: 'Minion' });
		expect(await minion.isPressed()).toBe(true);
		await minion.click();
		expect(await minion.isPressed()).toBe(false);
	});
});
