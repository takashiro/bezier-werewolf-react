import { Locator } from '@playwright/test';

interface LocatorOptions {
	has?: Locator;
	hasText?: string | RegExp;
}

export default LocatorOptions;
