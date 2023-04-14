import { Page } from '@playwright/test';
import { GameConfig } from '@bezier/werewolf-core';

import BasicPage from './common/BasicPage';

export default class RoomPage extends BasicPage {
	protected id: number;

	constructor(page: Page, id = 0) {
		super(page);
		this.id = id;
	}

	override async load(): Promise<void> {
		await this.page.goto(`/#room/${this.id}`);
	}

	async prepare(config: GameConfig): Promise<void> {
		const res = await this.page.request.post('api/room', {
			data: config,
		});
		const { id } = await res.json();
		this.id = id;
		await this.load();
	}

	getMainMessage() {
		return this.locator('.main-message');
	}
}
