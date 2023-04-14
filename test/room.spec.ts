import { expect, test } from '@playwright/test';
import { Role } from '@bezier/werewolf-core';

import RoomPage from './object/RoomPage';

test('Room Not Found', async ({ page }) => {
	const room = new RoomPage(page, 78415);
	await room.load();

	const main = room.getByRole('main');
	await expect(main.filter({ hasText: 'Loading...' })).toHaveCount(0);
	expect(await main.textContent()).toBe('The room does not exist.');
});

test('Open a new room', async ({ page }) => {
	const room = new RoomPage(page);

	await test.step('open seat form', async () => {
		await room.prepare({
			roles: [
				Role.Werewolf, Role.Werewolf, Role.Minion,
				Role.Villager, Role.Villager, Role.Seer, Role.Troublemaker, Role.Robber, Role.Drunk,
				Role.Tanner,
			],
		});
		await page.screenshot({
			path: 'output/room/1 seat form.png',
			fullPage: true,
		});
	});

	await test.step('fill in seat form', async () => {
		const seatNumber = room.getByRole('spinbutton', { name: 'Seat Number' });
		await seatNumber.fill('1');
		await page.screenshot({
			path: 'output/room/2 fill in.png',
			fullPage: true,
		});
	});

	await test.step('view my role', async () => {
		const submit = room.getByRole('button', { name: 'View My Role' });
		await submit.click();
		await page.screenshot({
			path: 'output/room/3 view my role.png',
			fullPage: true,
		});
	});
});
