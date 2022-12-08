import { Page } from '@playwright/test';
import BasicPage from './common/BasicPage';

export default class RoomPage extends BasicPage {
	protected id: number;

	constructor(page: Page, id: number) {
		super(page);
		this.id = id;
	}

	override async load(): Promise<void> {
		await this.page.goto(`/#room/${this.id}`);
	}

	getMainMessage() {
		return this.locator('.main-message');
	}
}
