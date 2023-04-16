import BasicLocator from '../common/BasicLocator';

export default class SpinButton extends BasicLocator {
	async getValue(): Promise<number> {
		const value = await this.e.inputValue();
		return Number.parseInt(value, 10);
	}
}
