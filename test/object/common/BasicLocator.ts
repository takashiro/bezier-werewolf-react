import { Locator } from '@playwright/test';

type RoleLocatorParameters = Parameters<Locator['getByRole']>;

export type AriaRole = RoleLocatorParameters[0];

export type RoleLocatorOptions = RoleLocatorParameters[1];

export default class BasicLocator {
	protected readonly e: Locator;

	constructor(e: Locator | BasicLocator) {
		if ('e' in e) {
			this.e = e.e;
		} else {
			this.e = e;
		}
	}

	getByRole(role: AriaRole, options: RoleLocatorOptions = {}) {
		if (options.exact === undefined) {
			options.exact = true;
		}
		return this.e.getByRole(role, options);
	}

	isVisible(...args: Parameters<Locator['isVisible']>) {
		return this.e.isVisible(...args);
	}
}
