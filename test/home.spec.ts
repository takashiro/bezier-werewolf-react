import { expect, test } from '@playwright/test';

test('It opens home page', async ({ page }) => {
	await page.goto('/');
	const img = page.locator('header img');
	expect(await img.getAttribute('alt')).toBe('Game Assistant for One Night Ultimate Werewolf');
});
