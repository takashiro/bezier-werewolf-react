import { Locator, Page } from '@playwright/test';

import LocatorOptions from './LocatorOptions';
import Region from '../landmark/Region';

export default abstract class BasicPage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	getBanner(): Region {
		return new Region(this.getByRole('banner'));
	}

	getMain(): Region {
		return new Region(this.getByRole('main'));
	}

	getContentInfo(): Region {
		return new Region(this.getByRole('contentinfo'));
	}

	locator(selector: string, options?: LocatorOptions) {
		return this.page.locator(selector, options);
	}

	getByRole(...args: Parameters<Locator['getByRole']>) {
		return this.page.getByRole(...args);
	}

	abstract load(): Promise<void>;
}
