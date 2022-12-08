import { Page } from '@playwright/test';

import LocatorOptions from './LocatorOptions';

export default abstract class BasicPage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	locator(selector: string, options?: LocatorOptions) {
		return this.page.locator(selector, options);
	}

	abstract load(): Promise<void>;
}
