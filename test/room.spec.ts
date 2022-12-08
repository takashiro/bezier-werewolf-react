import { expect, test } from '@playwright/test';
import RoomPage from './object/RoomPage';

test('Room Not Found', async ({ page }) => {
	const room = new RoomPage(page, 78415);
	await room.load();

	const message = room.getMainMessage();
	expect(await message.textContent()).toBe('The room does not exist.');
});
