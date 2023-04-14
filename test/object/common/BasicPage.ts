import { Locator, Page } from '@playwright/test';

import LocatorOptions from './LocatorOptions';

export default abstract class BasicPage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	locator(selector: string, options?: LocatorOptions) {
		return this.page.locator(selector, options);
	}

	getByRole(...args: Parameters<Locator['getByRole']>) {
		return this.page.getByRole(...args);
	}

	abstract load(): Promise<void>;
}
