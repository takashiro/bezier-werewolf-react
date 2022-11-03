import { expect, test } from '@playwright/test';

test('It opens home page', async ({ page }) => {
	await page.goto('/');
	const content = await page.textContent('body');
	expect(content).toBe('Loading...');
});
