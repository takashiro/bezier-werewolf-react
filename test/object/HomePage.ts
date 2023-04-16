import BasicPage from './common/BasicPage';

export default class HomePage extends BasicPage {
	override async load(): Promise<void> {
		await this.page.goto('/');
	}
}
