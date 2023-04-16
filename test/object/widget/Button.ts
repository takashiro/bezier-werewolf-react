import { Locator } from '@playwright/test';

import BasicLocator from '../common/BasicLocator';

export default class Button extends BasicLocator {
	async isPressed(): Promise<boolean> {
		const pressed = await this.e.getAttribute('aria-pressed');
		return pressed === 'true';
	}

	click(...args: Parameters<Locator['click']>): Promise<void> {
		return this.e.click(...args);
	}
}
